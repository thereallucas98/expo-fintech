import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { MARGIN } from './config'
import SortableList from './sortable-list'
import Tile from './tile'

const tiles = [
  {
    id: 'spent',
  },
  {
    id: 'cashback',
  },
  {
    id: 'recent',
  },
  {
    id: 'cards',
  },
]

const WidgetList = () => {
  return (
    <GestureHandlerRootView
      style={{
        paddingHorizontal: MARGIN,
      }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </GestureHandlerRootView>
  )
}

export default WidgetList
