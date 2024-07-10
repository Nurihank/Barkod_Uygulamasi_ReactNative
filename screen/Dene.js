import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';

const InfiniteScrollExample = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (isLoading) {
      return; // Prevent multiple requests while one is in progress
    }

    setIsLoading(true);

    // Simulating API call with setTimeout
    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
        .then(response => response.json())
        .then(newData => {
          setData(prevData => [...prevData, ...newData]);
          setPage(page + 1);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
          setIsLoading(false);
        });
    }, 1000); // Simulated delay
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={fetchData}
      onEndReachedThreshold={0.5} // Adjust the value as needed
      ListFooterComponent={renderFooter}
    />
  );
};

export default InfiniteScrollExample;
