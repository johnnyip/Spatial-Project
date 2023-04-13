import { AutoComplete, Input } from 'antd';
import { useState } from 'react';

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
    
const SearchBox = () => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');

  const handleSearch = (value) => {
    setInput(value);
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  const handleClick = (value) => {
    console.log('onClick', value);
  }
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      value={input}
    >
      <Input.Search size="large"  enterButton loading={false} 
        onSearch={handleClick} 
      />
    </AutoComplete>
  );
};

export default SearchBox;