import React from 'react';

import {ListComponentStyle} from '../../styles';
import {View, FlatList} from 'react-native';

import {ListItem,ListItemBusStops} from './ListItem';

export class RecommendLists extends React.PureComponent {
  constructor() {
    super();
  }
  renderItem = ({item}) => {
    return (
      <ListItem
        item={item}
        setSelectedValue={data => {
          this.props.setSelectedValue(data);
        }}
        showBusStationLocation={data => {
          this.props.showBusStationLocation(data);
        }}
      />
    );
  };
  render() {
    const {items} = this.props;
    return (
      <View style={ListComponentStyle.ListView}>
        <FlatList
          data={items}
          keyExtractor={item => item['id']}
          /* ITEM SEP */
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
export class BusStationLists extends React.PureComponent {
  constructor() {
    super();
  }
  renderItem(item,onPressed) {
    // const {onPressed} = this.props;
    return <ListItemBusStops item={item} onPressed={onPressed}/>
  }
  render(){
    const {stations,onPressed} = this.props;
    return (
      <View >
        <FlatList
          nestedScrollEnabled={true}
          data={stations}
          keyExtractor={item => item['id']}
          /* ITEM SEP */
          // ItemSeparatorComponent={<View style={{width: '100%', backGroundColor:'black'}}/>}
          renderItem={({item})=>{
            return this.renderItem(item,onPressed)
          }}
        />
      </View>
    )
  }
}