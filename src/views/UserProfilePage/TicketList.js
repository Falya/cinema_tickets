import React, { Component } from 'react';
import { Collapse, List } from 'antd';
import TicketCard from './TicketCard';
const { Panel } = Collapse;

class TicketList extends Component {
  constructor(props) {
    super(props);
  }

  formatDate = date => {
    const seanceDate = new Date(date);
    const formatedDate = seanceDate.toLocaleDateString();
    const formatedTime = seanceDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formatedDate} / ${formatedTime}`;
  };

  renderSeance = seance => {
    return (
      <div className="ticket_panel__header">
        <div className="ticket_panel__poster">
          <img src={seance.movieInfo.poster} alt={seance.movieInfo.name} />
        </div>
        <div className="film_name">{seance.movieInfo.name}</div>
        <div className="cinema_adress">
          <span className="icon-location"></span>
          <span>
            {seance.movieTheaterInfo.name}, {seance.movieTheaterInfo.city}, {seance.movieTheaterInfo.adress} /{' '}
            {seance.hallName}
          </span>
        </div>
        <div className="seance_date">
          <span className="icon-calendar"></span>
          <span>{this.formatDate(seance.date)}</span>
        </div>
        <div className="tickets_amount">
          Tickets amount: <span>{seance.tickets.length}</span>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Collapse bordered={false} accordion className="tickets_list">
        {this.props.orders.map((seance, index) => {
          return (
            <Panel header={this.renderSeance(seance)} key={index} className="ticket_panel">
              <List
                itemLayout="horizontal"
                // bordered={true}
                dataSource={[...seance.tickets, ...seance.features]}
                renderItem={item => (
                  <List.Item>
                    <TicketCard>{item}</TicketCard>
                  </List.Item>
                )}
              />
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

export default TicketList;
