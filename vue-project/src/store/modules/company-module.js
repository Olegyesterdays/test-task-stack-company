const state = () => ({
  company: [
    {
      id: '101',
      name: 'Tech Solutions',
      director: 'Иванов Иван',
      phoneNumber: '+7 (495) 555-1010'
    },
    {
      id: '102',
      name: 'Greenline Logistics',
      director: 'Петров Пётр',
      phoneNumber: '+7 (812) 555-1020'
    },
    {
      id: '103',
      name: 'SkyHigh Innovations',
      director: 'Сидоров Сергей',
      phoneNumber: '+7 (901) 555-1030'
    },
    {
      id: '104',
      name: 'Riverland Foods',
      director: 'Фёдоров Фёдор',
      phoneNumber: '+7 (916) 555-1040'
    },
    {
      id: '105',
      name: 'Oceanic Travel',
      director: 'Смирнов Дмитрий',
      phoneNumber: '+7 (495) 555-1050'
    },
    {
      id: '106',
      name: 'Apex Security',
      director: 'Кузнецов Николай',
      phoneNumber: '+7 (903) 555-1060'
    },
    {
      id: '107',
      name: 'Harmony Cosmetics',
      director: 'Попов Алексей',
      phoneNumber: '+7 (812) 555-1070'
    },
    {
      id: '108',
      name: 'Starlight Entertainment',
      director: 'Волков Владимир',
      phoneNumber: '+7 (921) 555-1080'
    },
    {
      id: '109',
      name: 'Urban Construction',
      director: 'Яковлев Борис',
      phoneNumber: '+7 (905) 555-1090'
    },
    {
      id: '110',
      name: 'Aurora Health',
      director: 'Лебедев Антон',
      phoneNumber: '+7 (495) 555-1100'
    }
  ],
  currentPage: 1,
  itemsPerPage: 5,
  searchQuery: '',
  sortBy: null,
  sortOrder: 'asc'
});

const getters = {
  getCompany(state) {
    return state.company;
  },

  getFilteredCompanies(state) {
    const query = state.searchQuery.toLowerCase().trim();
    if (!query) {
      return state.company;
    }
    return state.company.filter(item => item.director.toLowerCase().includes(query));
  },

  getSortedCompanies(state, getters) {
    const companies = getters.getFilteredCompanies.slice();
    const { sortBy, sortOrder } = state;

    if (!sortBy) {
      return companies;
    }

    companies.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortBy === 'director') {
        valA = a.director.toLowerCase();
        valB = b.director.toLowerCase();
      } else {
        return 0;
      }

      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      return 0;
    });

    return companies;
  },

  getCurrentPage(state) {
    return state.currentPage;
  },

  getTotalPages(state, getters) {
    return Math.ceil(getters.getSortedCompanies.length / state.itemsPerPage);
  },

  getCompaniesInRange(state, getters) {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return getters.getSortedCompanies.slice(start, end);
  }
};

const mutations = {
  setSearchQuery(state, query) {
    state.searchQuery = query;
  },

  setSort(state, column) {
    if (state.sortBy === column) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortBy = column;
      state.sortOrder = 'asc';
    }
  },

  incrementPage(state) {
    state.currentPage += 1;
  },
  decrementPage(state) {
    state.currentPage -= 1;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },

  addCompany(state, { company }) {
    state.company.push(company);
  },
  deleteCompany(state, { id }) {
    state.company = state.company.filter(c => c.id !== id);
  }
};

const actions = {
  nextGroup({ commit, state, getters }) {
    if (state.currentPage < getters.getTotalPages) {
      commit('incrementPage');
    }
  },
  previousGroup({ commit, state }) {
    if (state.currentPage > 1) {
      commit('decrementPage');
    }
  },
  deleteCompany({ commit, state, getters }, { id }) {
    commit('deleteCompany', { id });
    const totalPages = getters.getTotalPages;
    if (state.currentPage > totalPages) {
      commit('setCurrentPage', Math.max(totalPages, 1));
    }
  },
  addCompany({ commit }, { company }) {
    commit('addCompany', { company });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
