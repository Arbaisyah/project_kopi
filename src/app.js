document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000 },
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
    ]
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const existing = this.items.find(item => item.id === newItem.id);

      if (existing) {
        existing.quantity++;
        existing.total = existing.price * existing.quantity;
      } else {
        this.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price
        });
      }

      this.quantity++;
      this.total += newItem.price;
    },

    remove(id) {
      // ambil item yg mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      if (!cartItem) return;

      // jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri dan kurangi quantity
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else {
        // jika item hanya satu, hapus dari cart
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },

    rupiah(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
  });
});
