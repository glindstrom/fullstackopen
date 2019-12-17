const blogs = [
  {
    title: 'test blog 1',
    author: 'test author',
    url: 'http://localhost',
    likes: 667,
    user: {
      username: 'foobar',
      name: 'Foo Bar',
      id: '5de02afd699f6c211243fff0'
    },
    id: '5de92dc5accf1a2a19f4e87b'
  },
  {
    title: 'test blog 1',
    author: 'test author',
    url: 'http://localhost',
    likes: 666,
    user: {
      username: 'foobar',
      name: 'Foo Bar',
      id: '5de02afd699f6c211243fff0'
    },
    id: '5de9373035982e2b2751df25'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }
