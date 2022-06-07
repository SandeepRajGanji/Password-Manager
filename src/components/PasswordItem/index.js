import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePasswordItem, isChecked} = props
  const {website, id, username, password, classNames} = passwordDetails
  // console.log(isChecked)
  const passwordItem = isChecked ? (
    <p className="input-details">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-image"
    />
  )
  const onDeletePasswordItem = () => {
    deletePasswordItem(id)
  }

  return (
    <li>
      <div className="details-container">
        <p className={`user-logo ${classNames}`}>{website[0]}</p>
        <div>
          <p className="input-details">{website}</p>
          <p className="input-details">{username}</p>
          {passwordItem}
        </div>
      </div>
      <button type="button" testid="delete" onClick={onDeletePasswordItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}
export default PasswordItem

