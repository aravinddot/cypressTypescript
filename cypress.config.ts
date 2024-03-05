import { defineConfig } from 'cypress'
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
	require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
	require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
	e2e: {
		async setupNodeEvents(on, config) {
			const bundler = createBundler({
				plugins: [createEsbuildPlugin(config)],
			});

			on("file:preprocessor", bundler);
			await addCucumberPreprocessorPlugin(on, config);

			return config;
		},
		baseUrl: "https://opensource-demo.orangehrmlive.com",
		specPattern: "src/features/*.feature",
		fixturesFolder: 'src/fixtures',
		viewportHeight: 1024,
		viewportWidth: 1780,
		defaultCommandTimeout: 6000,
	},
});