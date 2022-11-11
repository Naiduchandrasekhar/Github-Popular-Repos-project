import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeOption: languageFiltersData[0].id,
    gitData: [],
    apiType: apiConstants.initial,
  }

  componentDidMount() {
    this.getLanguagesData()
  }

  getLanguagesData = async () => {
    this.setState({apiType: apiConstants.loading})
    const {activeOption} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeOption}`,
    )
    console.log(response)
    if (response.ok === true) {
      const responseData = await response.json()
      const updatedData = responseData.popular_repos.map(eachOne => ({
        name: eachOne.name,
        id: eachOne.id,
        issuesCount: eachOne.issues_count,
        forksCount: eachOne.forks_count,
        starsCount: eachOne.stars_count,
        avatarUrl: eachOne.avatar_url,
      }))
      this.setState({gitData: updatedData, apiType: apiConstants.success})
    } else {
      this.setState({apiType: apiConstants.failure})
    }
  }

  onClickTab = id => {
    this.setState({activeOption: id}, this.getLanguagesData)
  }

  renderSuccess = () => {
    const {gitData} = this.state
    return (
      <ul className="unorderRepositoryContainer">
        {gitData.map(eachOne => (
          <RepositoryItem key={eachOne.id} eachOne={eachOne} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
    </>
  )

  renderGithub = () => {
    const {apiType} = this.state

    switch (apiType) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.loading:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {activeOption, apiType} = this.state
    console.log(apiType)

    /** isLoading ? (
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          ) : (
            <ul className="unorderRepositoryContainer">
              {gitData.map(eachOne => (
                <RepositoryItem key={eachOne.id} eachOne={eachOne} />
              ))}
            </ul>
            this.setState({apiType: apiConstants.failure})
          ) */

    return (
      <div>
        <div className="gitContainer">
          <h1 className="popularHeader">Popular</h1>
          <ul className="unorderList">
            {languageFiltersData.map(eachOne => (
              <LanguageFilterItem
                key={eachOne.id}
                eachOne={eachOne}
                onClickTab={this.onClickTab}
                isActive={eachOne.id === activeOption}
              />
            ))}
          </ul>
          {this.renderGithub()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
