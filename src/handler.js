const { nanoid } = require('nanoid');
const transactions = require('./transactions');

const addPaysHandler = (request, h) => {
  const { name, norek, pay } = request.payload;
  const insertedAt = new Date().toISOString();
  const id = nanoid(16);
  const saldo = Math.floor(Math.random() * 10000000);

  if (norek === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal transaksi pembayaran, no rekening tidak ada',
    });
    response.code(400);
    return response;
  }

  if (saldo < pay) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal transaksi pembayaran, Saldo anda tidak mencukupi',
      data: {
        saldo,
      },
    });
    response.code(400);
    return response;
  }

  const newTransactions = {
    name, norek, pay, insertedAt, id, saldo,
  };

  transactions.push(newTransactions);

  const isSuccess = transactions.filter((t) => t.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      data: {
        transactions,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal melakukan transaksi',
  });
  response.code(500);
  return response;
};

const getAllPaysHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      transactions,
    },
  });
  response.code(200);
  return response;
};

const getDetailPaysHandler = (request, h) => {
  const { paysid } = request.params;

  const transaction = transactions.filter((t) => t.id === paysid)[0];

  if (transaction !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        transaction,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal melihat transaksi, Id tidak ditemukan',
  });
  response.code(400);
  return response;
};

const editDetailPaysHandler = (request, h) => {
  const { paysid } = request.params;
  const { name, norek, pays } = request.payload;

  const index = transactions.findIndex((transaction) => transaction.id === paysid);
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal mengubah data transaksi',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    transactions[index] = {
      ...transactions[index],
      name,
      norek,
      pays,
    };
    const response = h.response({
      status: 'success',
      message: 'Berhasil mengubah data transaksi',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal mengubah data transaksi, id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteDetailPaysHandler = (request, h) => {
  const { paysid } = request.params;

  const index = transactions.findIndex((i) => i.id === paysid);
  if (index !== -1) {
    transactions.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus data transaksi',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal mengahpus data transaksi',
  });
  response.code(500);
  return response;
};

module.exports = {
  addPaysHandler,
  getAllPaysHandler,
  getDetailPaysHandler,
  editDetailPaysHandler,
  deleteDetailPaysHandler,
};
