import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-profile-page.scss';
import { withRouter } from 'react-router-dom';
import { Avatar, Card, Skeleton, Tabs } from 'antd';

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = state => {
  return {
    loading: state.loadingStateReducer.loading,
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

  onChange = key => {
    console.log(key);
  };

  render() {
    const { loading, userName } = this.props;
    return (
      <section className="user_profile">
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
            <Tabs
              defaultActiveKey="1"
              className="user_profile__tabs"
              tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
              onChange={this.onChange}>
              <TabPane tab="Future tickets" key="1">
                <div className="ticket"></div>
              </TabPane>
              <TabPane tab="Past tickets" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="All tickets" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            <Card bordered={false} className="user_info">
              <Skeleton loading={loading} avatar active>
                <Meta avatar={<Avatar shape="circle" size={70} icon="user" />} title={userName} />
                <div className="user_info_stat">
                  <span className="user_email">
                    Email: <strong>ergvgdf@sdf.com</strong>
                  </span>
                  <span>
                    Registred at: <strong>12.12.2018</strong>
                  </span>
                  <span>
                    Bought tickets: <strong>12</strong>
                  </span>
                  <span>
                    Last purchase: <strong>12.12.2019</strong>
                  </span>
                </div>
              </Skeleton>
            </Card>
          </div>
        </div>
      </section>
    );
  }
}

const UserProfilePage = connect(mapStateToProps)(ConnectedUserProfilePage);

export default withRouter(UserProfilePage);
