// Imports the Google Cloud client library
const { Datastore } = require("@google-cloud/datastore");

// Creates a client
const datastore = new Datastore({
	projectId: "sps-team-proyect",
	keyFilename: "./google_keys.json",
});

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

module.exports = {
	addEntity,
};
