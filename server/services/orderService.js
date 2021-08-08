const fs = require("fs");

const user = {
  password: "123",
};

function getOrder(idOrder) {
  try {
    const file = fs.readFileSync("server/API/Lists/Orders.json", "utf-8");

    let orders = [];

    if (file) {
      orders = JSON.parse(file)?.list || [];
    }

    const order = orders.find((x) => x.id === idOrder);
    if (!order) {
      throw new Error("Order was not found");
    }

    return order;
  } catch (err) {
    throw new Error("Cannot to read orders");
  }
}

function getOrders() {
  try {
    const file = fs.readFileSync("server/API/Lists/Orders.json", "utf-8");

    let orders = [];

    if (file) {
      orders = JSON.parse(file)?.list || [];
    }

    return orders;
  } catch (err) {
    throw new Error("Cannot to read orders");
  }
}

function getOrderClients(idOrder) {
  try {
    const file = fs.readFileSync("server/API/Lists/Clients.json", "utf-8");
    let clients = [];

    if (file) {
      clients = JSON.parse(file)?.list || [];
    }

    const client = clients.find((x) =>
      x.orders?.data?.some((y) => y.id == idOrder)
    );

    if (client) {
      return client;
    } else {
      throw new Error("Client was not found");
    }
  } catch (err) {
    throw new Error("Cannot read clients");
  }
}

function getClients(filter) {
  try {
    const file = fs.readFileSync("server/API/Lists/Clients.json", "utf-8");

    let clients = [];

    if (file) {
      clients = JSON.parse(file)?.list || [];
    }

    if (filter) {
      clients = clients.filter((x) => {
        let fio = x.last_name;
        if (x.first_name) {
          fio += " " + x.first_name;
        }
        if (x.patronymic) {
          fio += " " + x.patronymic;
        }
        return (
          x.phone?.toLowerCase().includes(filter) ||
          fio.toLowerCase().includes(filter)
        );
      });
    }

    return clients;
  } catch (err) {
    throw new Error("Cannot to read clients");
  }
}

function getClient(idClient) {
  try {
    const file = fs.readFileSync("server/API/Lists/Clients.json", "utf-8");

    let clients = [];

    if (file) {
      clients = JSON.parse(file)?.list || [];
    }

    const client = clients.find((x) => x.id === idClient);
    if (!client) {
      throw new Error("Order was not found");
    }
    return client;
  } catch (err) {
    throw new Error("Cannot to read clients");
  }
}

function saveClient(client, isNew) {
  try {
    const file = fs.readFileSync("server/API/Lists/Clients.json", "utf-8");
    const clients = file ? JSON.parse(file) : { list: [] };

    if (isNew) {
      client.id =
        clients.list.map((x) => x.id).reduce((max, x) => (max > x ? max : x)) +
        1;

      clients.list.push(client);
    } else {
      const clientIndex = clients.list.findIndex((x) => x.id === client.id);

      if (clientIndex > -1) {
        clients.list[clientIndex] = client;
      } else {
        throw new Error("Client do not exist");
      }
    }
    fs.writeFileSync("server/API/Lists/Clients.json", JSON.stringify(clients));

    return client;
  } catch (err) {
    throw new Error("Cannot to save client");
  }
}

function createOrderClients(idOrder, client) {
  const order = getOrder(idOrder);

  client.created_at = new Date();
  client.orders = {
    data: [order],
  };

  return saveClient(client, true);
}

function linkClientToOrder(idOrder, idClient) {
  const order = getOrder(idOrder);
  const client = getClient(idClient);

  client.orders.data.push(order);

  return saveClient(client);
}

function unlinkClientFromOrder(idOrder, idClient) {
  const client = getClient(idClient);

  const orderIndex = client.orders.data.findIndex((x) => x.id === idOrder);

  if (orderIndex > -1) {
    client.orders.data.splice(orderIndex, 1);
  }
  saveClient(client);
}

module.exports = {
  user,
  getOrder,
  getOrders,
  getOrderClients,
  getClient,
  getClients,
  createOrderClients,
  linkClientToOrder,
  unlinkClientFromOrder,
};
