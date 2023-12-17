const Sample = require('./models/Sample');
const Collection = require('./models/Collection');

Sample.belongsTo(Collection, { foreignKey: 'collectionId' });
Collection.hasMany(Sample, { foreignKey: 'collectionId' });
