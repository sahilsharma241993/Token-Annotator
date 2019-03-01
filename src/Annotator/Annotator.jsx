import * as React from 'react'

import Mark from './Mark'
import {selectionIsEmpty, splitTokens} from './utils'


const Token = props => {
  return <span data-i={props.i}>{props.content} </span>
}

class TokenAnnotator extends React.Component {
  static defaultProps = {
    renderMark: props => <Mark {...props} />,
  }

  constructor(props) {
    super(props)

    this.rootRef = React.createRef()
  }

  componentDidMount() {
    this.rootRef.current.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    this.rootRef.current.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    if (!this.props.onChange) return

    const selection = window.getSelection()
    
    if (selectionIsEmpty(selection)) return

    if (
      !selection.anchorNode.parentElement.hasAttribute('data-i')
    ) {
      window.getSelection().empty()
      return false
    }

    let start = parseInt(selection.anchorNode.parentElement.getAttribute('data-i'), 10)
    if ([' ', ',', '.'].includes(this.props.tokens.slice(start, start + 1)[0].trim())){
        window.getSelection().empty()
      return false
    }
    const tag = ['a','e','i','o','u','A','E','I','O','U'].includes(this.props.tokens.slice(start, start + 1)[0].trim()[0]) ? 'Baky' : 'Kola'
    this.props.onChange([
      ...this.props.value,
      this.getSpan({tag: tag, start, end: start + 1, tokens: this.props.tokens.slice(start, start + 1)}),
    ])
    window.getSelection().empty()
  }

  handleSplitClick = ({start, end}) => {
    const splitIndex = this.props.value.findIndex(s => s.start === start && s.end === end)
    if (splitIndex >= 0) {
      this.props.onChange([
        ...this.props.value.slice(0, splitIndex),
        ...this.props.value.slice(splitIndex + 1),
      ], this.props.value[splitIndex])
    }
  }

  getSpan = span => {
    if (this.props.getSpan) return this.props.getSpan(span)
    return span
  }

  render() {
    const {tokens, value, renderMark, className} = this.props
    const splits = splitTokens(tokens, value);
    return (
      <div className = {className} ref={this.rootRef}>
        {splits.map(
          (split, i) =>
            split.mark ? (
              renderMark({
                key: `${split.start}-${split.end}`,
                ...split,
                onClick: this.handleSplitClick,
              })
            ) : (
              <Token key={split.i} {...split} />
            )
        )}
      </div>
    )
  }
}

export default TokenAnnotator
