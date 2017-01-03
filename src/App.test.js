import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './components/App'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const sut = renderer.create(
    <App />
  )

  const testSnapshot = () => {
    let tree = sut.toJSON()
    expect(tree).toMatchSnapshot()
  }

  testSnapshot()
})

it('should start timer', () => {
  const sut = shallow(<App />)

  expect(sut.find('h3').text()).toEqual('25:00')

  sut.find('.toggle-btn').simulate('click')

  expect(sut.state('hasStarted')).toEqual(true)
})