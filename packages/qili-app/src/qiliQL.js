export default {
	account_user:graphql`
		fragment qiliQL_account_user on User{
			id
			photo
			username
		}
	`,
	account_me_Query:graphql`
		query qiliQL_account_me_Query{
			user:me{
				...qiliQL_account_user
			}
		}
	`,
	account_userProfile_Query:graphql`
		query qiliQL_account_userProfile_Query{
			user:me{
				...qiliQL_userProfile_user
			}
		}
	`,
	userProfile_user:graphql`
		fragment qiliQL_userProfile_user on User{
			id
			username
			birthday
			gender
			location
			photo
			signature
		}
	`,
}
