import { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import gql from 'graphql-tag'

import BaseSocket from '../utils/sockets/BaseSocket'

const getLobbyHash = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('room')
  }
  return ''
}

const GET_SOCKET_CONFIG = gql`
  query Config($gameType: String, $hash: String) {
    socketConfig(gameType: $gameType, hash: $hash) {
      hostname
    }
  }
`

/**
 * Hook abstraction for using a basic websocket
 * @param {Object} options websocket options, including base connection handlers
 * @param {String}
 */
const useSocket = (
  SocketClass = BaseSocket,
  metaOptions = {},
  queryOptions = {}
) => {
  const [getConfig, { data: config }] = useLazyQuery(GET_SOCKET_CONFIG)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log('getting config', getLobbyHash())
      getConfig({ variables: {
				...queryOptions,
				hash: getLobbyHash(),
				hostname: window.location.hostname
			}})
    }
	}, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && config && !socket) {
      setSocket(
        new SocketClass({
          ...metaOptions,
          hostname: config?.hostname || `http://${window.location.hostname}:8080`,
        })
      )
    }
  }, [config])

  return socket
}

export default useSocket
