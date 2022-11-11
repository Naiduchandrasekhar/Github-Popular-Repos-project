// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachOne, onClickTab, isActive} = props

  const classTab = isActive ? 'active' : ''

  const onTabClick = () => {
    onClickTab(eachOne.id)
  }

  return (
    <button type="button" className={`tabButton ${classTab}`}>
      <li className="listItem" onClick={onTabClick}>
        {eachOne.language}
      </li>
    </button>
  )
}

export default LanguageFilterItem
