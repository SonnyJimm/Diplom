import React from 'react';

import {ListComponentStyle} from '../../styles';
import {View, FlatList} from 'react-native';

import {ListItem} from './ListItem';

export const RecommendLists = ({items, setSelectedValue}) => {
  const renderItem = ({item}) => {
    return <ListItem item={item} setSelectedValue={setSelectedValue} />;
  };
  return (
    <View style={ListComponentStyle.ListView}>
      <FlatList
        data={items}
        keyExtractor={item => item['id']}
        /* ITEM SEP */
        renderItem={renderItem}
      />
    </View>
  );
};
