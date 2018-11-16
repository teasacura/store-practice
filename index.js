

class App {
  constructor(store={},parentApp=null){
    this.store = store
    this.parentApp = parentApp
  }
  set(k,v){
    this.store[`${k}`] = v
  }

  get(k){
    return this.store[`${k}`] ? this.store[`${k}`] : null
  }

  begin_t(){
    let storeCopy = Object.assign({}, this.store)
    let app = new App(storeCopy, this)
    return app
  }

  end_t(){
    return this
  }

  rollback(){
    return this.parentApp
  }
}

let app = new App
app.set("a", 1)
app.set("b", 2)
let app2 = app.begin_t()
app2.set("a", 3)
app2.set("c", 10)
let app3 = app2.begin_t()
app3.set("a", 4)
app3.set("b", 8)
let prev = app3.rollback()
let prev2 = prev.end_t()
console.log(prev2)


// Example calls
// get("b") # == nil None null
// set("a", 1)
// set("b", 2)
// get("a") # == 1
// get("b") # == 2
// begin_t()
//   get("a") # == 1
//   set("a", 3)
//   get("a") # == 3
//   set("c",10)
//   begin_t()
//     get("a") # == 3
//     set("a", 4)
//     set("b", 8)
//     get("a") # == 4
//     get("b") # == 8
//   rollback()
//   get("a") # == 3
//   get("b") # == 2
// end_t()
// get("a") # == 3
// get("b") # == 2
// get("c") # == 10
