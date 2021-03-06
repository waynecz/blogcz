const { Store } = require('koa-session2');
const mongoose = require('mongoose');
const Session = require('./models/session');
mongoose.connect('mongodb://451578533:azhou921025cheng@ds034807.mlab.com:34807/wayneboooo/Blogcz').then(res => {}).catch(e => console.log(e));

class mongooseStore extends Store {
  constructor() {
    super();
  }

  async get(sid) {
    let { doc } = await Session.findOrCreate({ sid });
    if (doc) {
      if (Date.now() - new Date(doc.now).getTime() > doc.maxAge) {
        this.destroy(sid);
        return null;
      }

      return doc.content ? JSON.parse(doc.content) : {}
    }
  }

  async set(content, { sid = this.getID(24), maxAge = 10 * 3600000000 } = {}) {
    // console.log('session set:', content);
    let { doc } = await Session.findOrCreate({ sid });
    doc.content = JSON.stringify(content);
    doc.maxAge = maxAge;

    await new Session(doc).save();

    return sid;
  }

  async destroy(sid) {
    return await Session.remove({ sid }).exec();
  }
}

module.exports = mongooseStore;