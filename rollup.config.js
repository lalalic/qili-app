const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const minify=require("rollup-plugin-uglify")
const less =require('rollup-plugin-less')
const _external=externals=>id=>!!externals.find(a=>id==a||id.startsWith(a+'/'))
const {dependencies={}, peerDependencies={}}=require(`./package.json`)

export default {
	output:{
		exports:"named",
	},
	external:_external(
	  Object.keys(dependencies)
		.concat(Object.keys(peerDependencies))
		.filter(a=>!!a)
	),
	plugins: [
		less({insert:true,output:a=>a}),
		babel({
			babelrc:false,
			presets: [
				["env", {modules:false}],
				"react",
			],
			exclude: ["node_modules/**"],
			plugins:[
				"babel-plugin-external-helpers",
				//@@@can't use this for rollup, otherwise it will add module.exports=exports["default"]
				//"babel-plugin-add-module-exports",
				"babel-plugin-transform-object-rest-spread",
				"babel-plugin-transform-class-properties",
				"babel-plugin-relay",
			]
		}),
		commonjs({
			namedExports:{
				'node_modules/react/index.js': [
					'Component', 'PureComponent',
					'Children', 'createElement',
					'Fragment', 'createFactory'
				],
				"node_modules/immutable/dist/immutable.js":[
					"List","Map","Collection"
				],
				'node_modules/prop-types/index.js':
					"string,object,bool,node,number,oneOfType,func".split(",")

			}
		}),
	]
}
