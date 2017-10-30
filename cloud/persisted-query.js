//generated from persisted-query.js, don't edit it
module.exports={
	"comment_create_Mutation":`mutation comment_create_Mutation(
		  $parent: ID!
		  $content: String!
		  $type: CommentType
		) {
		  comment: comment_create(parent: $parent, content: $content, type: $type) {
		    __typename
		    id
		    content
		    type
		    createdAt
		    author {
		      id
		      name
		      photo
		    }
		    isOwner
		  }
		}
		`,
	"file_create_Mutation":`mutation file_create_Mutation(
		  $_id: String!
		  $host: ID!
		  $bucket: String
		  $size: Int
		  $crc: Int
		  $mimeType: String
		  $imageInfo: JSON
		) {
		  file_create(_id: $_id, host: $host, bucket: $bucket, size: $size, crc: $crc, mimeType: $mimeType, imageInfo: $imageInfo) {
		    url
		    id
		  }
		}
		`,
	"app_create_Mutation":`mutation app_create_Mutation(
		  $name: String!
		  $uname: String
		) {
		  app_create(name: $name, uname: $uname) {
		    ...app
		    id
		  }
		}
		
		fragment app on App {
		  id
		  name
		  uname
		  apiKey
		  isDev
		}
		`,
	"app_remove_Mutation":`mutation app_remove_Mutation(
		  $id: ObjectID!
		) {
		  app_remove(_id: $id)
		}
		`,
	"app_update_Mutation":`mutation app_update_Mutation(
		  $id: ObjectID!
		  $name: String
		  $uname: String
		) {
		  app_update(_id: $id, name: $name, uname: $uname) {
		    updatedAt
		    id
		  }
		}
		`,
	"cloud_update_Mutation":`mutation cloud_update_Mutation(
		  $id: ObjectID!
		  $cloudCode: String!
		) {
		  app_update(_id: $id, cloudCode: $cloudCode) {
		    cloudCode
		    schema
		    id
		  }
		}
		`,
	"main_app_update_Query":`query main_app_update_Query(
		  $id: ObjectID!
		) {
		  me {
		    app(_id: $id) {
		      ...app
		      id
		    }
		    id
		  }
		}
		
		fragment app on App {
		  id
		  name
		  uname
		  apiKey
		  isDev
		}
		`,
	"main_cloud_Query":`query main_cloud_Query(
		  $id: ObjectID!
		) {
		  me {
		    app(_id: $id) {
		      ...cloud_app
		      id
		    }
		    id
		  }
		}
		
		fragment cloud_app on App {
		  cloudCode
		  ...schema_app
		}
		
		fragment schema_app on App {
		  schema
		}
		`,
	"main_comment_Query":`query main_comment_Query(
		  $parent: ObjectID!
		  $count: Int = 10
		  $cursor: JSON
		) {
		  ...main_appComments
		}
		
		fragment main_appComments on Query {
		  comments: app_comments(parent: $parent, last: $count, before: $cursor) {
		    edges {
		      node {
		        __typename
		        id
		        content
		        type
		        createdAt
		        author {
		          id
		          name
		          photo
		        }
		        isOwner
		      }
		      cursor
		    }
		    pageInfo {
		      hasPreviousPage
		      startCursor
		    }
		  }
		}
		`,
	"main_my_apps_Query":`query main_my_apps_Query {
		  me {
		    ...my
		    id
		  }
		}
		
		fragment my on User {
		  id
		  username
		  photo
		  apps {
		    id
		    name
		  }
		}
		`,
	"main_prefetch_Query":`query main_prefetch_Query {
		  me {
		    name
		    token
		    apps {
		      id
		      name
		      apiKey
		    }
		    id
		  }
		}
		`
}