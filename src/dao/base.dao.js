class BaseDao {
	constructor(model) {
		this.model = model;
	}
  
	/**
     * findOne a single document
     * @param filter
     * @param projection
     * @returns {Promise}
     */
	findOne(filter, projection) {
		return this.model.findOne(filter, projection);
	}
  
	/**
     * find more than one document
     * @param filter
     * @param projection
     * @returns {Promise}
     */
	findMany(filter, projection) {
		return this.model.find(filter, projection);
	}
  
	/**
     * updateOne a single doc
     * @param filter
     * @param docToUpdate
     * @param options
     * @returns {Promise}
     */
	updateOne(filter, docToUpdate, options = { returnOriginal: false }) {
		if (options.returnOriginal === true) {
			return this.model.findOneAndUpdate(filter, docToUpdate, options);
		}
		return this.model.updateOne(filter, docToUpdate, options);
	}
  
	/**
     * insertOne a single doc
     * @param doc
     * @returns {Promise}
     */
	insertOne(doc) {
		return this.model.insertOne(doc);
	}
  
	/**
     * remove a single doc
     * @param doc
     * @returns {Promise}
     */
	removeOne(doc) {
		return this.model.remove(doc);
	}
  
	/**
     * remove more than one doc
     * @param doc
     * @returns {Promise}
     */
	removeMany(doc) {
		return this.model.removeMany(doc);
	}
  
	deleteMany(doc) {
		return this.model.deleteMany(doc);
	}
  
	findCount(filter) {
		return this.model.find(filter).count();
	}
  
	aggregationQuery(query) {
		return this.model.aggregate(query);
	}
  
	findOneAndUpdate(query, data, options= {new :true}) {
		return this.model.findOneAndUpdate(query, data, options);
	}
}
  
module.exports = BaseDao;
  