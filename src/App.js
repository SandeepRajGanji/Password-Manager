import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from './components/PasswordItem'
import './App.css'

const colors = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
class App extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    search: '',
    count: 0,
    hide: false,
  }

  changeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  managePassword = event => {
    event.preventDefault()
    const {username, password, website, passwordList} = this.state

    const randomClassPicker = Math.ceil(Math.random() * colors.length - 1)
    if (username !== '' && password !== '' && website !== '') {
      const newPasswordObject = {
        id: v4(),
        website,
        username,
        password,
        classNames: colors[randomClassPicker],
        passwordHidden: true,
      }
      this.setState(prevState => ({
        passwordList: [...passwordList, newPasswordObject],
        username: '',
        website: '',
        password: '',
        count: prevState.count + 1,
      }))
    }
  }

  deletePasswordItem = id => {
    const {passwordList} = this.state
    const updatedPasswordList = passwordList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState(prevState => ({
      passwordList: updatedPasswordList,
      count: prevState.count - 1,
    }))
  }

  getFilteredPasswordList = () => {
    const {passwordList, search} = this.state
    const updatedPasswordList = passwordList.filter(eachItem => {
      if (eachItem.website.toLowerCase().includes(search.toLowerCase()))
        return eachItem
      return null
    })

    return updatedPasswordList
  }

  searchPassword = event => {
    this.setState({
      search: event.target.value,
    })
  }

  onShowHidePassword = () => {
    const {passwordList} = this.state
    const filteredList = passwordList.map(eachItem => {
      if (eachItem.passwordHidden === true) {
        return {...eachItem, passwordHidden: false}
      }
      return {...eachItem, passwordHidden: true}
    })
    this.setState({
      passwordList: filteredList,
    })
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      hide: !prevState.hide,
    }))
    this.onShowHidePassword()
  }

  render() {
    const {username, password, website, count} = this.state

    const updatedPasswordList = this.getFilteredPasswordList()
    let length = false
    if (updatedPasswordList.length === 0) length = true

    return (
      <div className="app-container">
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-manager-container">
            <div className="password-manager-small-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>

            <form onSubmit={this.managePassword} className="form-container">
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-image"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-text"
                  onChange={this.changeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-text"
                  onChange={this.changeUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-text"
                  onChange={this.changePassword}
                  value={password}
                />
              </div>
              <div className="add-container">
                <button type="submit" className="add">
                  Add
                </button>
              </div>
            </form>
            <div className="password-manager-large-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>
          </div>
        </div>
        <div className="password-container">
          <div className="saved-password-container">
            <div className="heading-section">
              <div className="heading-count-section">
                <h1 className="your-password-heading">Your Passwords</h1>
                <p className="count">{count}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                  onClick={this.renderPasswordListView}
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.searchPassword}
                />
              </div>
            </div>
            <div className="show-password-container">
              <input
                type="checkbox"
                id="show-password"
                className="input-checkbox"
                onClick={this.onShowPassword}
              />
              <label htmlFor="show-password">Show Passwords</label>
            </div>
            {length ? (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password"
                />
                <p className="your-password-heading">No Passwords</p>
              </div>
            ) : (
              <ul>
                {updatedPasswordList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    passwordDetails={eachItem}
                    deletePasswordItem={this.deletePasswordItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
