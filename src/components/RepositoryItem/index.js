// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachOne} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachOne
  return (
    <li className="listElement">
      <img src={avatarUrl} alt={name} className="logos" />
      <h1 className="textName">{name}</h1>
      <div className="listDivContainer">
        <div className="starContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="sfiLogos"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="forksContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="sfiLogos"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="issueContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="sfiLogos"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
