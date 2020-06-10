/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const search = `query ($number_of_repos: Int!) {
						  viewer {
							name
							projects(last: $number_of_repos) {
							  nodes {
								name
								id
								columns(last: $number_of_repos) {
								  edges {
									node {
									  name
									  id
									}
								  }
								}
							  }
							}
						  }
						}`

    const a = context.github.graphql(search, {
      number_of_repos: 100,
      headers: {
        auth: {
          id: 67782,
          privateKey: process.env.PRIVATE_KEY
        }
      }
    })
    console.log(a)

  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
