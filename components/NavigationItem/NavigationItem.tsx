import * as React from 'react'
import clsx from 'clsx'
import { PureComponent } from 'react'
import Link from 'next/link'
import Container from './style'

interface Props {
  href: string
  depth: number
  active?: boolean
  completed?: boolean
  containsActive?: boolean
  children: React.ReactChild
}

class NavigationItem extends PureComponent<Props> {
  static defaultProps = {
    depth: 1
  }

  render() {
    const { href, children, containsActive, depth, active, completed } = this.props

    return (
      <Container
        className={clsx({ deep: depth > 1 }, { active }, { completed }, { 'contains-active': containsActive })}
      >
        <Link href={href}>
          <a>{children}</a>
        </Link>
      </Container>
    )
  }
}

export default NavigationItem
