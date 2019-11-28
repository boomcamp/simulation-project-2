import React from 'react';
import { Sidenav, Nav, Icon } from 'rsuite';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    const headerStyles = {
        padding: 20,
        fontSize: 16,
        background: '#34c3ff',
        color: ' #fff'
    };

    return (
        <div style={{ width: "17%" }}>
            <Sidenav>
                <Sidenav.Header>
                    <div style={headerStyles}>Navigation</div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Link to="/">
                            <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
                                Home
                            </Nav.Item>
                        </Link>
                        <Link to="/coinlist">
                            <Nav.Item eventKey="2" icon={<Icon icon="coincide" />}>
                                Coin Lists
                            </Nav.Item>
                        </Link>

                        <Link to="/coindetail">
                            <Nav.Item eventKey="3" icon={<Icon icon="info-circle" />}>
                                Coin Details
                            </Nav.Item>
                        </Link>
                        <Link to="/tracking">
                            <Nav.Item eventKey="4" icon={<Icon icon="money" />}>Investment Tracking</Nav.Item>
                        </Link>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
}