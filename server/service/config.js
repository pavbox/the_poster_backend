import nconf from 'nconf';
import path from 'path';

nconf
  .defaults({
    "port" : "3020",
    "mongoose": {
        "uri": "mongodb://localhost/real_poster"
    }
  });
//real_poster
// use [database];
// db.dropDatabase();
export { nconf };
