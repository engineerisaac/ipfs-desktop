import React, {PropTypes} from 'react'
import {Flex, Inline} from 'jsxstyle'
import FileDrop from 'react-file-drop'
import ipc from 'electron-safe-ipc/guest'

import SimpleStat from '../simple-stat'
import IconButton from '../icon-button'
import Icon from '../icon'

import 'normalize.css'
import 'css-box-sizing-border-box/index.css'
import '../../../styles/common.css'
import '../../../styles/fonts.css'
import '../../../styles/file-drop.less'

const stopButtonStyles = {
  background: 'none',
  border: 'none',
  position: 'absolute',
  top: '11px',
  right: '0'
}

export default class ProfileScreen extends React.Component {

  static propTypes = {
    peers: PropTypes.number,
    location: PropTypes.string,
    onStopClick: PropTypes.func,
    onConsoleClick: PropTypes.func,
    onBrowserClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    onCloseClick: PropTypes.func
  }

  static defaultProps = {
    peers: 0,
    location: '',
    onStopClick () {},
    onConsoleClick () {},
    onBrowserClick () {},
    onSettingsClick () {},
    onCloseClick () {}
  }

  _onFileDrop = (files, event) => {
    const filesArray = []
    for (let i = 0; i < files.length; i++) {
      filesArray.push(files[i].path)
    }

    ipc.send('drop-files', null, filesArray)
  }

  render () {
    return (
      <Flex
        width='100%'
        height='100%'
        backgroundColor='#19b5fe'
        color='#FFFFFF'
        flexDirection='column'
        alignItems='center'
        >
        <FileDrop
          onDrop={this._onFileDrop}
          />
        <Flex
          height='40px'>
          <Inline
            alignSelf='center'
            flex='1'
            paddingTop='4px'
            >
            IPFS
          </Inline>
          <IconButton
            icon='cross'
            onClick={this.props.onCloseClick}
            style={stopButtonStyles}
            iconStyle={{fontSize: '21px'}}
            />
        </Flex>
        <Flex
          flex='1'
          color='#FFFFFF'
          backgroundImage={`url(${require('../../../img/stars.png')})`}
          backgroundSize='100%'
          backgroundPosition='0 0'
          width='100%'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          >
          <Icon name='location' style={{padding: '10px 0', fontSize: '32px'}}/>
          <Inline margin='0 auto'>
            {this.props.location}
          </Inline>
        </Flex>
        <Flex
          flex='1'
          backgroundColor='#FFFFFF'
          color='#000000'
          width='100%'
          height='30%'
          justifyContent='space-around'
          >
          <SimpleStat
            name='peers'
            value={this.props.peers}
            color='#50d2c2'
            />
        </Flex>
        <Flex
          height='70px'
          justifyContent='space-around'
          width='100%'
          >
          <IconButton
            name='Console'
            icon='gaming'
            onClick={this.props.onConsoleClick}
            />
          <IconButton
            name='Browser'
            icon='window'
            onClick={this.props.onBrowserClick}
            />
          <IconButton
            name='Quit'
            icon='media-stop'
            onClick={this.props.onStopClick}
            />
        </Flex>
      </Flex>
    )
  }
}