import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePasswordItem} = props
  const {
    website,
    id,
    username,
    password,
    passwordHidden,
    classNames,
  } = passwordDetails

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
          {passwordHidden === true ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-image"
            />
          ) : (
            <p className="input-details">{password}</p>
          )}
        </div>
      </div>
      <button type="button" testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
          onClick={onDeletePasswordItem}
        />
      </button>
    </li>
  )
}
export default PasswordItem
