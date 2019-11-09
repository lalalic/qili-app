module.exports={
	modulePathIgnorePatterns:[require.resolve("./package.json")],
	moduleNameMapper:{
		"^qili-app":`<rootDir>/packages/qili-app/src`,
	}
}
