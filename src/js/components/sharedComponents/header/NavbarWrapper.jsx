import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useLocation } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';
import MobileNav from './mobile/MobileNav';
import MegaMenu from "./megaMenu/MegaMenu";

const NavbarWrapper = () => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isHomepage, setIsHomepage] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/") {
            setIsHomepage(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (showMobileNav) {
            // disable body scrolling
            document.querySelector('body').classList.add('show-mobile-nav');
        } else {
            // re-enable body scrolling
            document.querySelector('body').classList.remove('show-mobile-nav');
        }
    }
    , [showMobileNav]);

    const clickedHeaderLink = (route) => {
        Analytics.event({
            category: 'Header - Link',
            action: route
        });
    };

    const displayMobileNav = () => {
        setShowMobileNav(true);
    };

    const hideMobileNav = () => {
    // re-enable body scrolling
        document.querySelector('body').classList.remove('show-mobile-nav');
        setShowMobileNav(false);
    };

    const toggleMobileNav = () => {
        if (showMobileNav) {
            hideMobileNav();
        }
        else {
            displayMobileNav();
        }
    };

    return (
        <nav
            className={`${isHomepage ? "site-navigation site-navigation-homepage" : "site-navigation"}`}
            aria-label="Site navigation">
            <div className="site-navigation__wrapper">
                <div className="site-navigation__logo site-logo">
                    <div className="site-logo__wrapper" id="logo">
                        <Link
                            className="site-logo__link"
                            to="/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={clickedHeaderLink}>
                            <img
                                className="site-logo__image"
                                src="img/logo.png"
                                srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                                alt="USAspending.gov" />
                        </Link>
                    </div>
                </div>
                <div className="site-navigation__mobile mobile-hamburger">
                    <div className="mobile-hamburger__wrapper">
                        <button
                            className="mobile-hamburger__button"
                            onClick={toggleMobileNav}>
                            <span className="mobile-hamburger__meat-buns" />
                        </button>
                    </div>
                </div>
                {showMobileNav && <MobileNav hideMobileNav={hideMobileNav} />}
                <div className="site-navigation__menu full-menu">
                    <MegaMenu />
                </div>
            </div>
        </nav>
    );
};

export default NavbarWrapper;

