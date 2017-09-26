

/*
 * Connect to Database.
 * Use default nodejs promises instead.
 */

import mongoose from 'mongoose';
import { nconf as config } from './../service/config';

mongoose.Promise = global.Promise;

var database = mongoose.connect(config.get('mongoose:uri'), { useMongoClient: true });

export { mongoose, database };
