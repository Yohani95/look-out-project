import React from 'react';

function Footer() {
  return (
    <footer className="font-small pt-4 mt-4 text-white">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-lg-">
            <img
              src="https://kpaz.la/wp-content/themes/kpaz/img/logo-footer.svg"
              className="img-fluid mx-auto mr d-table "
              width="240px"
            />
          </div>
          {/* <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer Content</h5>
                <p></p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                </ul>
            </div> */}
        </div>
      </div>

      <div className="text-center py-3">
        © 2023 Copyright
        <br />
        <a
          href="https://kpaz.la/"
          target="https://kpaz.la/"
          // className="nav-link"
        >
          {' '}
          KPAZ.la
        </a>
      </div>
    </footer>
  );
}

export default Footer;
