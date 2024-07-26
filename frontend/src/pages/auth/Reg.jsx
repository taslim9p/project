import React from "react";
import Layout from "../../components/layout/Layout";
import "./reg.css";

function Reg() {
  return (
    <Layout>
      <div className="main">
        <div className="box">

          <div>
            <label htmlFor="uname">UserName</label>
            <input type="text" id="uname" name="uname" />
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" />
          </div>

          <br />
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" />
          </div>
          <label htmlFor="add1">Address1</label>
            <textarea name="add1" id="add1" cols="69" rows="2" className="responsive-textarea"></textarea>
          <div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reg;
