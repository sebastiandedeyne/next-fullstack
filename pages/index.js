import axios from 'axios';
import { Component } from 'react';

export default class Home extends Component {
  static async getInitialProps() {
    return {
      posts: await axios
        .get('http://localhost:3000/api/posts')
        .then(response => response.data),
    };
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.props.posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
