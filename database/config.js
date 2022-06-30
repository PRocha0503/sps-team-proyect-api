// Imports the Google Cloud client library
const { Datastore } = require("@google-cloud/datastore");

// Creates a client
const datastore = new Datastore({
	projectId: "sps-team-proyect",
	keyFilename: "./google_keys.json",
});

function getKey(kind, id) {
	return datastore.key([kind, id]);
}

async function addEntity(kind, name, objectToAdd) {
	// The Cloud Datastore key for the new entity
	const taskKey = datastore.key([kind, name]);

	// Prepares the new entity
	const task = {
		key: taskKey,
		data: {
			...objectToAdd,
		},
	};

	// Saves the entity
	await datastore.save(task);
}

async function getEntity(kind, id) {
	console.log(kind, id);
	const transaction = datastore.transaction();
	const taskKey = datastore.key([kind, id]);
	try {
		const [task] = await transaction.get(taskKey);
		return task;
	} catch (err) {
		throw err;
	}
}

async function getAllEntries(kind, start = 0, limit = 100) {
	const query = datastore.createQuery(kind).start(start).limit(limit);
	const [tasks] = await datastore.runQuery(query);
	return tasks;
}

async function getOwnerProducts(owner_name) {
	const query = datastore.createQuery("Product").filter("owner", "=", owner_name);
	const [tasks] = await datastore.runQuery(query)
	return tasks;
}

async function updateEntity(kind, id, changes) {
	const transaction = datastore.transaction();
	const taskKey = datastore.key([kind, id]);
	console.log(taskKey);
	try {
		await transaction.run();
		const [task] = await transaction.get(taskKey);
		console.log(task);
		for (let change in changes) {
			task[change] = changes[change];
		}
		transaction.save({
			key: taskKey,
			data: task,
		});
		await transaction.commit();
	} catch (err) {
		await transaction.rollback();
		throw err;
	}
}

async function deleteEntity(kind, id) {
	try {
		const taskKey = datastore.key([kind, id]);
		await datastore.delete(taskKey);
	} catch (err) {
		throw err;
	}
}

module.exports = {
	getKey,
	getEntity,
	addEntity,
	getAllEntries,
	updateEntity,
	deleteEntity,
	getOwnerProducts,
};
