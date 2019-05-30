/**
 * Load Environment Variables
 */
require('dotenv').config();
const util = require('util');
const { MongoClient } = require('mongodb');
const async = require('async');
const { get } = require('lodash');
async.parallel = util.promisify(async.parallel);
const { URI, database } = require('../../src/config/mongo.config');
const sourceConfig = require('./source.config');
const { MedicalDiagnosis, Category } = require('../../src/domain/model/medical-diagnosis');

(async () => {
  try {
    /**
     * Connect to source databases
     */
    const sourceClient = new MongoClient(sourceConfig.URI, {
      useNewUrlParser: true
    });
    await sourceClient.connect();
    console.log('connected to source database');
    const sourceDb = sourceClient.db(sourceConfig.database);

    /**
     * Connect to destination database
     */
    const destClient = new MongoClient(URI, {
      useNewUrlParser: true
    });
    await destClient.connect();
    console.log('connected to destination database');
    const destDb = destClient.db(database);

    console.log('clearing destination database');
    await destDb.collection('diagnosis').deleteMany({});
    console.log('destination database empty');

    /**
     * Transformation script
     */
    sourceDb
      .collection('SubCategory')
      .find({})
      .forEach(
        async subCat => {
          try {
            const { category, details } = await async.parallel({
              // find category
              category: callback => {
                sourceDb
                  .collection('Category')
                  .findOne({
                    code: subCat.group
                  })
                  .then(group => callback(null, new Category(group.code, group.description)))
                  .catch(error => callback(error));
              },
              // find details
              details: async callback => {
                try {
                  let details = await sourceDb.collection('DETAIL').findOne({
                    CID_STAMPS: {
                      $elemMatch: {
                        $eq: subCat.code
                      }
                    }
                  });

                  if (!details) {
                    details = await sourceDb.collection('DETAIL').findOne({
                      CID_STAMPS: {
                        $elemMatch: {
                          $eq: subCat.group
                        }
                      }
                    });
                  }
                  callback(null, details);
                } catch (error) {
                  callback(error);
                }
              }
            });

            const symptoms = get(details, 'symptoms', []).map(symptom => symptom.slice(3));

            // assembly diagnosis
            const diagnosis = new MedicalDiagnosis(
              subCat.code,
              subCat.description,
              category,
              symptoms
            );
            diagnosis.info = get(details, 'info', '');

            // input in destination database
            destDb.collection('diagnosis').insertOne(diagnosis, () => {
              console.log('inserted successfully diagnosis ', diagnosis.code);
            });
          } catch (error) {
            console.error(error);
            /**
             * Close connections
             */
            sourceClient.close();
            destClient.close();
            process.exit(-1);
          }
        },
        error => {
          if (error) {
            console.error('error: ', error);
            process.exit(0);
          }

          /**
           * Close connections
           */
          sourceClient.close();
          destClient.close();
        }
      );
  } catch (error) {
    console.error(error.stack);
    throw error;
  }
})();
