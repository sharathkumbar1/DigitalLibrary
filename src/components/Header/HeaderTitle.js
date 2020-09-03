import { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setHeaderTitle } from '../../store/layout/actionCreator'

export class HeaderTitle extends Component {
  static propTypes = {
    setHeaderTitle: func,
    title: string,
  }

  componentWillMount () {
    this.props.setHeaderTitle(this.props.title)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.title && this.props.title !== nextProps.title) {
      this.props.setHeaderTitle(nextProps.title)
    }
  }

  render () {
    return null
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setHeaderTitle }, dispatch)

export default connect(null, mapDispatchToProps)(HeaderTitle)
