const serialize = (data) => {
  const t = Array.isArray(data) ? data : [data];
  const serialized = t?.map((address) => {
    return {
      id: address.id,
      addressLine: address.address_line,
      userId: address.user_id,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      createdAt: address.created_at,
      updatedAt: address.updated_at,
    };
  });

  return Array.isArray(data) ? serialized : serialized[0];
};

module.exports = serialize;
