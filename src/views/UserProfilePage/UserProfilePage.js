import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-profile-page.scss';
import { withRouter, Redirect } from 'react-router-dom';
import Avatar from 'antd/lib/avatar';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import Tabs from 'antd/lib/tabs';
import TicketList from './TicketList';
import { getUserProfileApi, setBlur } from '../../redux/actions/actions';

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = state => {
  return {
    loading: state.loadingStateReducer.loading,
    userProfile: state.userProfileReducer.userProfile,
    userName: state.userNameReducer.userName,
  };
};

class ConnectedUserProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  onCloseButton = () => {
    this.props.history.replace('/');
  };

  onBackButton = () => {
    this.props.history.goBack();
  };

  filterSeances = condition => {
    return this.props.userProfile.orders.filter(order => {
      const seanceDate = new Date(order.date);
      if (condition === 'feature') {
        return Date.now() < seanceDate.getTime();
      }
      return Date.now() > seanceDate.getTime();
    });
  };

  componentDidMount() {
    this.props.getUserProfileApi();
    this.props.setBlur(true);
  }

  // shouldComponentUpdate(nextProps) {
  //   if (condition) {

  //   }
  //   return this.Props !== nextProps;
  // }

  componentWillUnmount() {
    this.props.setBlur(false);
  }

  render() {
    const { loading, userProfile, userName } = this.props;
    return (
      <section className="user_profile">
        {!userName && <Redirect to="/" />}
        {loading && <span className="icon-spinner2 page_spiner" />}
        <div className="user_profile__wrapper">
          <div className="user_profile__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn" onClick={this.onBackButton}>
                <span className="icon-arrow-left" />
              </div>
              <div className="nav_bar__title">
                <h3>{userName}`s profile</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span className="icon-cross" onClick={this.onCloseButton} />
              </div>
            </div>
          </div>
          <div className="user_profile__body">
            <Card bordered={false} className="user_info">
              <Skeleton loading={loading} avatar active>
                <Meta avatar={<Avatar shape="circle" size={70} icon="user" />} title={userName} />
                {userProfile && (
                  <div className="user_info_stat">
                    <span className="user_email">
                      Email: <strong>{userProfile.email}</strong>
                    </span>
                    <span>
                      Registred at: <strong>{new Date(userProfile.registredAt).toLocaleDateString()}</strong>
                    </span>
                    <span>
                      Bought tickets: <strong>{userProfile.bought}</strong>
                    </span>
                    <span>
                      Last purchase:{' '}
                      <strong>
                        {userProfile.lastPurchase
                          ? new Date(userProfile.lastPurchase).toLocaleString()
                          : `haven't bought yet`}
                      </strong>
                    </span>
                  </div>
                )}
              </Skeleton>
            </Card>
            <Tabs
              defaultActiveKey="1"
              className="user_profile__tabs"
              tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
              <TabPane tab="Future tickets" key="1">
                {userProfile && <TicketList orders={this.filterSeances('feature')} />}
              </TabPane>
              <TabPane tab="Past tickets" key="2">
                {userProfile && <TicketList orders={this.filterSeances('past')} />}
              </TabPane>
              <TabPane tab="All tickets" key="3">
                {userProfile && <TicketList orders={userProfile.orders} />}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

const UserProfilePage = connect(
  mapStateToProps,
  { getUserProfileApi, setBlur }
)(ConnectedUserProfilePage);

export default withRouter(UserProfilePage);
