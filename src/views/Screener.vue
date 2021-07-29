<template>
  <div
    v-if="isAuth"
    class="bg-light"
  >
    <div class="container py-10">
      <div class="row">
        <div class="col-lg-1 col-md-2">
          <ul class="menu text-center">
            <li
              class="py-3 cursor-pointer hover-secondary"
              :class="{'active': activePanel === 'techPanel'}"
              @click="activePanel = 'techPanel'"
            >
              <font-awesome-icon
                class="h2"
                :icon="['fas', 'chart-line']"
              />
              <h2 class="h6 font-weight-normal mt-1">
                技術面
              </h2>
            </li>
            <li
              class="py-3 cursor-pointer hover-secondary"
              :class="{'active': activePanel === 'chipPanel'}"
              @click="activePanel = 'chipPanel'"
            >
              <font-awesome-icon
                class="
              h2"
                :icon="['fas', 'coins']"
              />
              <h2 class="h6 font-weight-normal mt-1">
                籌碼面
              </h2>
            </li>
            <li
              class="py-3 cursor-pointer hover-secondary"
              :class="{'active': activePanel === 'fundamentPanel'}"
              @click="activePanel = 'fundamentPanel'"
            >
              <font-awesome-icon
                class="
              h2"
                :icon="['fas', 'hand-holding-usd']"
              />
              <h2 class="h6 font-weight-normal mt-1">
                基本面
              </h2>
            </li>
            <li
              class="py-3 cursor-pointer hover-secondary"
              :class="{'active': activePanel === 'listPanel'}"
              @click="activePanel = 'listPanel'"
            >
              <font-awesome-icon
                class="
              h2"
                :icon="['fas', 'clipboard-list']"
              />
              <h2 class="h6 font-weight-normal mt-1">
                選股清單
              </h2>
            </li>
          </ul>
        </div>
        <div class="col-lg-11 col-md-10">
          <div class="row">
            <div
              class="col-md-6"
              v-for="conditionCategory in conditionCategories"
              :key="conditionCategory.id"
              v-show="activePanel === `${conditionCategory.id}Panel`"
            >
              <div class="panel py-4 px-4 bg-white border border-gray rounded">
                <h2 class="h4 mb-3">
                  {{ conditionCategory.title }}
                </h2>
                <ul
                  class="accordion"
                  :id="`${conditionCategory.id}Accordion`"
                >
                  <li
                    class="card border-0 mb-1"
                    v-for="condition, index in conditionCategory.conditions"
                    :key="condition.type"
                  >
                    <div
                      class="card-header bg-light-secondary border border-secondary
                      rounded py-0 px-0"
                    >
                      <h3>
                        <button
                          class="btn btn-block text-left text-white py-2 px-3"
                          type="button"
                          data-toggle="collapse"
                          :data-target="`#${condition.type}`"
                        >
                          {{ condition.type | conditionTypeFilter }}
                        </button>
                      </h3>
                    </div>
                    <div
                      :id="condition.type"
                      class="collapse"
                      :class="{'show': index === 0}"
                      :data-parent="`#${conditionCategory.id}Accordion`"
                    >
                      <div class="card-body py-0 px-1">
                        <ul>
                          <li
                            class="d-flex align-items-center py-2 border-bottom border-light"
                            :class="{'disabled': content.isChose}"
                            v-for="content in condition.contents"
                            :key="`${condition.type}content${content.tm}`"
                          >
                            <span>
                              {{ {...content, type: condition.type} | conditionContentFilter }}
                            </span>
                            <select
                              class="border border-muted rounded p-1 ml-2"
                              v-model="content.op"
                              v-if="content.op !== ''"
                            >
                              <option :value="1">
                                大於
                              </option>
                              <option :value="0">
                                小於
                              </option>
                            </select>
                            <select
                              class="border border-muted rounded p-1 ml-2"
                              v-model="content.val"
                              v-if="condition.values.length"
                            >
                              <option
                                v-for="value in condition.values"
                                :key="value"
                                :value="value"
                              >
                                {{ value }}
                              </option>
                            </select>
                            <span
                              class="ml-2"
                            >{{ condition.type | conditionUnitFilter }}</span>
                            <button
                              type="button"
                              class="btn btn-primary ml-auto"
                              @click="chooseCondition({...content, type: condition.type,
                                                       values:condition.values})"
                            >
                              <font-awesome-icon
                                class="text-white"
                                :icon="['fas', 'chevron-right']"
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-md-6"
              v-show="activePanel === `listPanel`"
            >
              <div class="choseStockList panel py-4 px-4 bg-white border border-gray rounded">
                <h2 class="h4 mb-3">
                  選股清單
                </h2>
                <ul
                  class="nav mb-3"
                >
                  <li
                    v-for="list,index in choseStockLists"
                    :key="list.id"
                    class="nav-item"
                  >
                    <a
                      class="nav-link"
                      data-toggle="pill"
                      :href="`#choseStockList${index}`"
                      :class="{'active': index === 0}"
                    >{{ list.id }}</a>
                  </li>
                </ul>
                <div
                  class="tab-content"
                >
                  <div
                    v-for="list,index in choseStockLists"
                    :key="list.id"
                    class="tab-pane fade text-primary"
                    :class="{'show': index === 0, 'active': index === 0}"
                    :id="`choseStockList${index}`"
                  >
                    <div class="d-flex align-items-center">
                      <div>
                        <h6 class="h5 mb-1">
                          {{ list.title }}
                        </h6>
                        <p>選股條件數： {{ list.conditions.length }} / {{ list.limit }}</p>
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary ml-auto"
                        @click="chooseListALLConditons(list)"
                      >
                        全部選取
                      </button>
                    </div>
                    <ul class="mt-3">
                      <li
                        v-for="condition,conditionIndex in list.conditions"
                        :key="`${condition.type}content${condition.tm}`"
                        class="d-flex align-items-center px-2 py-1 bg-light-secondary
                          border border-secondary rounded text-white mb-2"
                        :class="{'disabled': condition.isChose}"
                      >
                        <div>
                          <h3 class="h6 font-weight-normal">
                            {{ condition.type | conditionTypeFilter }}
                          </h3>
                          <div>
                            <span>{{ condition | conditionContentFilter }}</span>
                            <select
                              class="border border-muted rounded p-1 ml-2"
                              v-model="condition.op"
                              v-if="condition.op !== ''"
                            >
                              <option :value="1">
                                大於
                              </option>
                              <option :value="0">
                                小於
                              </option>
                            </select>
                            <select
                              class="border border-muted rounded p-1 ml-2"
                              v-model="condition.val"
                              v-if="condition.values.length"
                            >
                              <option
                                v-for="value in condition.values"
                                :key="value"
                                :value="value"
                              >
                                {{ value }}
                              </option>
                            </select>
                            <span
                              class="ml-2"
                            >{{ condition.type | conditionUnitFilter }}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="btn btn-outline-danger ml-auto"
                          @click="deleteListCondition(list, conditionIndex)"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'trash-alt']"
                          />
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary ml-2"
                          @click="chooseCondition(condition)"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'chevron-right']"
                          />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="panel-chose bg-white border border-gray rounded py-5 px-4 mb-4">
                <div v-if="choseConditions.length === 0">
                  <p class="h3 text-center mt-6">
                    請加入選股條件
                  </p>
                </div>
                <ul v-else>
                  <li
                    class="d-flex align-items-center p-2 bg-light-secondary
                      border border-secondary rounded text-white mb-3"
                    v-for="condition in choseConditions"
                    :key="`${condition.type}content${condition.tm}`"
                  >
                    <div>
                      <h3 class="h6 font-weight-normal">
                        {{ condition.type | conditionTypeFilter }}
                      </h3>
                      <div>
                        <span>{{ condition | conditionContentFilter }}</span>
                        <select
                          class="border border-muted rounded p-1 ml-2"
                          v-model="condition.op"
                          v-if="condition.op !== ''"
                        >
                          <option :value="1">
                            大於
                          </option>
                          <option :value="0">
                            小於
                          </option>
                        </select>
                        <select
                          class="border border-muted rounded p-1 ml-2"
                          v-model="condition.val"
                          v-if="condition.values.length"
                        >
                          <option
                            v-for="value in condition.values"
                            :key="value"
                            :value="value"
                          >
                            {{ value }}
                          </option>
                        </select>
                        <span
                          class="ml-2"
                        >{{ condition.type | conditionUnitFilter }}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-outline-primary border-0 ml-auto"
                      @click="deleteCondition(condition)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'times']"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="d-flex">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="deleteAllConditions()"
                >
                  清空條件
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary ml-auto"
                  data-toggle="modal"
                  data-target="#choseStockListModal"
                  :class="{'disabled': !choseConditions.length}"
                >
                  儲存條件
                </button>
                <button
                  type="button"
                  class="btn btn-primary ml-4"
                  @click="screener()"
                >
                  開始選股
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <p>
          根據條件共篩選 <span class="h4">{{ screenedStocks.length }}</span> 檔股票：
        </p>
        <table class="table table-striped bg-white text-center mt-6">
          <thead class="text-white">
            <tr>
              <th
                scope="col"
                width="100px"
                class="sticky-top bg-primary align-middle"
              >
                股票代碼
              </th>
              <th
                scope="col"
                width="100px"
                class="sticky-top bg-primary align-middle"
              >
                股票名稱
              </th>
              <th
                scope="col"
                width="150px"
                class="sticky-top bg-primary align-middle"
              >
                當天收盤價
              </th>
              <template v-if="screenedStocks.length">
                <th
                  v-for="condition,index in screenedStocks[0].conditions"
                  :key="`${condition.type}${condition.tm}`"
                  scope="col"
                  class="sticky-top bg-primary align-middle"
                >
                  <span>{{ condition.type | conditionTypeFilter }}</span><br>
                  <span>{{ condition | conditionContentFilter }}</span>
                  <template v-if="condition.val !== ''">
                    ({{ condition.type | conditionUnitFilter }})
                    <a
                      href="#"
                      class="d-block animated"
                      :class="{'animated-rotate': sortingStatus[index]}"
                      @click.prevent="sort(index)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'sort-up']"
                        class="text-white h5"
                      />
                    </a>
                  </template>
                  <span v-if="condition.note">{{ condition.note }}</span>
                </th>
              </template>
              <th
                scope="col"
                width="100px"
                class="sticky-top bg-primary align-middle"
              >
                追蹤狀態
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="stock in screenedStocks"
              :key="stock.stockNo"
            >
              <td
                scope="row"
                class="align-middle"
              >
                <a
                  href="#"
                  class="text-info"
                  @click.prevent="goBlankStock(stock.stockNo)"
                >{{ stock.stockNo }}</a>
              </td>
              <td class="align-middle">
                {{ stock.stockName }}
              </td>
              <td class="align-middle text-right">
                {{ stock.closingPrice | decimalFilter | thousandSeparatorFilter }}
              </td>
              <template v-for="condition in stock.conditions">
                <td
                  v-if="condition.val !== ''"
                  :key="`${condition.type}${condition.tm}`"
                  class="align-middle text-right"
                >
                  {{ condition.val | decimalFilter | thousandSeparatorFilter }}
                </td>
                <td
                  v-else
                  :key="`${condition.type}${condition.tm}`"
                >
                  <font-awesome-icon
                    class="align-middle text-success"
                    :icon="['fas', 'check']"
                  />
                </td>
              </template>
              <td class="align-middle">
                <button
                  v-if="!trackedStocks.some(item => item.stockNo === stock.stockNo)"
                  @click.prevent="addTrackedStock(stock.stockNo)"
                  class="btn btn-outline-primary border-0"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
                <button
                  v-else
                  @click.prevent="deleteTrackedStock(stock.stockNo)"
                  class="btn btn-outline-primary border-0"
                >
                  <font-awesome-icon :icon="['fas', 'times']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="loader-wrap position-relative"
        >
          <loading
            :active="isLoading"
            :is-full-page="false"
            :height="50"
          />
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="choseStockListModal"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 bg-primary text-white">
            <h5
              class="modal-title"
            >
              加入選股條件
            </h5>
            <button
              type="button"
              class="btn btn-outline-secondary border-0"
              data-dismiss="modal"
              aria-label="Close"
            >
              <font-awesome-icon
                :icon="['fas', 'times']"
                class="h5 text-white"
              />
            </button>
          </div>
          <div class="modal-body">
            <table class="mx-auto">
              <tr>
                <td
                  class="py-1"
                  width="80px"
                >
                  清單列表
                </td>
                <td
                  class="py-1"
                  width="250px"
                >
                  <select
                    class="form-control"
                    v-model="tempListId"
                  >
                    <option
                      v-for="item in choseStockLists"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.id }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td class="py-1">
                  清單名稱
                </td>
                <td class="py-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempListTitle"
                  >
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer text-center border-0">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addChoseStockList()"
            >
              加入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="alert alert-secondary d-flex align-items-center"
  >
    <div class="container text-center">
      <p class="h3 font-weight-normal">
        <font-awesome-icon
          :icon="['fas', 'unlock-alt']"
          class="mr-2"
        />
        登入會員才可以篩選股票
      </p>
      <router-link
        to="/login"
        class="btn btn-secondary text-white mt-6"
      >
        點我登入
      </router-link>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    isAuth: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      activePanel: 'techPanel',
      conditionCategories: [
        {
          id: 'tech',
          title: '技術面',
          conditions: [
            {
              type: 'ascendingOrder',
              contents: [{
                tm: '', op: '', val: '', isChose: false,
              }],
              values: [],
            },
            {
              type: 'capacity',
              contents: [
                {
                  tm: 5, op: 1, val: 50, isChose: false,
                },
                {
                  tm: 10, op: 1, val: 50, isChose: false,
                },
                {
                  tm: 20, op: 1, val: 50, isChose: false,
                }],
              values: [50, 100, 150, 200, 250, 300],
            },
            {
              type: 'BIAS',
              contents: [
                {
                  tm: 5, op: 1, val: 0, isChose: false,
                }, {
                  tm: 10, op: 1, val: 0, isChose: false,
                },
                {
                  tm: 20, op: 1, val: 0, isChose: false,
                }],
              values: [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10],
            },
            {
              type: 'K',
              contents: [
                {
                  tm: 9, op: 1, val: 0, isChose: false,
                },
              ],
              values: [0, 20, 40, 60, 80, 100],
            },
            {
              type: 'D',
              contents: [
                {
                  tm: 9, op: 1, val: 0, isChose: false,
                },
              ],
              values: [0, 20, 40, 60, 80, 100],
            },
            {
              type: 'KDGoldenCross',
              contents: [
                {
                  tm: 9, op: '', val: '', isChose: false,
                },
              ],
              values: [],
            },
            {
              type: 'RSI',
              contents: [
                {
                  tm: 6, op: 1, val: 0, isChose: false,
                },
                {
                  tm: 12, op: 1, val: 0, isChose: false,
                },
              ],
              values: [0, 20, 40, 60, 80, 100],
            },
            {
              type: 'RSIGoldenCross',
              contents: [
                {
                  tm: '', op: '', val: '', isChose: false,
                },
              ],
              values: [],
            },
            {
              type: 'MACDGoldenCross',
              contents: [
                {
                  tm: '', op: '', val: '', isChose: false,
                },
              ],
              values: [],
            },
            {
              type: 'bollingerBand',
              contents: [
                {
                  tm: 20, op: 1, val: '中線', isChose: false,
                },
              ],
              values: ['上軌道', '中線', '下軌道'],
            },
          ],
        },
        {
          id: 'chip',
          title: '籌碼面',
          conditions: [
            {
              type: 'foreignInvestorBS',
              contents: [
                {
                  tm: 1, op: 1, val: 200, isChose: false,
                }, {
                  tm: 3, op: 1, val: 200, isChose: false,
                },
                {
                  tm: 5, op: 1, val: 200, isChose: false,
                }],
              values: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
            },
            {
              type: 'investmentTrustBS',
              contents: [
                {
                  tm: 1, op: 1, val: 200, isChose: false,
                }, {
                  tm: 3, op: 1, val: 200, isChose: false,
                },
                {
                  tm: 5, op: 1, val: 200, isChose: false,
                }],
              values: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
            },
            {
              type: 'dealerBS',
              contents: [
                {
                  tm: 1, op: 1, val: 200, isChose: false,
                }, {
                  tm: 3, op: 1, val: 200, isChose: false,
                },
                {
                  tm: 5, op: 1, val: 200, isChose: false,
                }],
              values: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
            },
            {
              type: 'foreignInvestorCB',
              contents: [
                {
                  tm: 3, op: '', val: '', isChose: false,
                }, {
                  tm: 5, op: '', val: '', isChose: false,
                }],
              values: [],
            },
            {
              type: 'investmentTrustCB',
              contents: [
                {
                  tm: 3, op: '', val: '', isChose: false,
                }, {
                  tm: 5, op: '', val: '', isChose: false,
                }],
              values: [],
            },
            {
              type: 'dealerCB',
              contents: [
                {
                  tm: 3, op: '', val: '', isChose: false,
                }, {
                  tm: 5, op: '', val: '', isChose: false,
                }],
              values: [],
            },
          ],
        },
        {
          id: 'fundament',
          title: '基本面',
          conditions: [
            {
              type: 'monthlyRevenueYoY',
              contents: [
                {
                  tm: 2, op: 1, val: 0, isChose: false,
                }, {
                  tm: 3, op: 1, val: 0, isChose: false,
                },
                {
                  tm: 4, op: 1, val: 0, isChose: false,
                }],
              values: [0, 10, 20, 30, 40, 50],
            },
            {
              type: 'monthlyRevenueMoM',
              contents: [
                {
                  tm: 2, op: 1, val: 0, isChose: false,
                }, {
                  tm: 3, op: 1, val: 0, isChose: false,
                },
                {
                  tm: 4, op: 1, val: 0, isChose: false,
                }],
              values: [0, 10, 20, 30, 40, 50],
            },
            {
              type: 'threeRatio',
              contents: [
                {
                  tm: 1, op: '', val: '', isChose: false,
                }, {
                  tm: 2, op: '', val: '', isChose: false,
                },
                {
                  tm: 3, op: '', val: '', isChose: false,
                }, {
                  tm: 4, op: '', val: '', isChose: false,
                }],
              values: [],
            },
            {
              type: 'epsGrowthRatio',
              contents: [
                {
                  tm: 1, op: 1, val: 0, isChose: false,
                }, {
                  tm: 2, op: 1, val: 0, isChose: false,
                },
                {
                  tm: 3, op: 1, val: 0, isChose: false,
                }, {
                  tm: 4, op: 1, val: 0, isChose: false,
                }],
              values: [0, 5, 10, 20, 30, 40, 50],
            },
            {
              type: 'dividendYield',
              contents: [
                {
                  tm: '', op: 1, val: 0, isChose: false,
                },
              ],
              values: [0, 2, 4, 6, 8, 10],
            },
            {
              type: 'PER',
              contents: [
                {
                  tm: '', op: 1, val: 0, isChose: false,
                },
              ],
              values: [0, 5, 10, 15, 20, 25, 30],
            },
          ],
        },
      ],
      choseConditions: [],
      screenedStocks: [],
      sortingStatus: [],
      trackedStocks: [],
      choseStockLists: [],
      tempListId: '',
      tempListTitle: '',
    };
  },
  methods: {
    chooseCondition(condition) {
      this.choseConditions.push(condition);

      // Add the status of the chose condition.
      for (let i = 0; i < this.conditionCategories.length; i += 1) {
        for (let j = 0; j < this.conditionCategories[i].conditions.length; j += 1) {
          if (this.conditionCategories[i].conditions[j].type === condition.type) {
            for (let k = 0; k < this.conditionCategories[i].conditions[j].contents.length; k += 1) {
              if (this.conditionCategories[i].conditions[j].contents[k].tm === condition.tm) {
                this.conditionCategories[i].conditions[j].contents[k].isChose = true;
              }
            }
          }
        }
      }
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        for (let j = 0; j < this.choseStockLists[i].conditions.length; j += 1) {
          if (this.choseStockLists[i].conditions[j].type === condition.type
            && this.choseStockLists[i].conditions[j].tm === condition.tm) {
            this.choseStockLists[i].conditions[j].isChose = true;
          }
        }
      }
    },
    deleteCondition(condition) {
      // Delete this condition from chose conditions.
      for (let i = 0; i < this.choseConditions.length; i += 1) {
        if (this.choseConditions[i].type === condition.type
            && this.choseConditions[i].tm === condition.tm) {
          this.choseConditions.splice(i, 1);
          break;
        }
      }
      // Clear the status of the chose condition.
      for (let i = 0; i < this.conditionCategories.length; i += 1) {
        for (let j = 0; j < this.conditionCategories[i].conditions.length; j += 1) {
          if (this.conditionCategories[i].conditions[j].type === condition.type) {
            for (let k = 0; k < this.conditionCategories[i].conditions[j].contents.length; k += 1) {
              if (this.conditionCategories[i].conditions[j].contents[k].tm === condition.tm) {
                this.conditionCategories[i].conditions[j].contents[k].isChose = false;
              }
            }
          }
        }
      }
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        for (let j = 0; j < this.choseStockLists[i].conditions.length; j += 1) {
          if (this.choseStockLists[i].conditions[j].type === condition.type
            && this.choseStockLists[i].conditions[j].tm === condition.tm) {
            this.choseStockLists[i].conditions[j].isChose = false;
          }
        }
      }
    },
    deleteAllConditions() {
      this.choseConditions = [];
      // Clear the status of the chose condition.
      for (let i = 0; i < this.conditionCategories.length; i += 1) {
        for (let j = 0; j < this.conditionCategories[i].conditions.length; j += 1) {
          for (let k = 0; k < this.conditionCategories[i].conditions[j].contents.length; k += 1) {
            this.conditionCategories[i].conditions[j].contents[k].isChose = false;
          }
        }
      }
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        for (let j = 0; j < this.choseStockLists[i].conditions.length; j += 1) {
          this.choseStockLists[i].conditions[j].isChose = false;
        }
      }
    },
    screener() {
      if (this.choseConditions.length) {
        const api = `${process.env.VUE_APP_API_PATH}screener`;
        this.screenedStocks = [];
        this.sortingStatus = [];
        this.isLoading = true;
        this.$http.post(api, this.choseConditions)
          .then((res) => {
            this.isLoading = false;
            this.screenedStocks = res.data.data;
            if (this.screenedStocks.length) {
              this.sortingStatus = new Array(this.screenedStocks[0].conditions.length)
                .fill(false);
            }
          })
          .catch((err) => {
            if (err.response.data.message === '驗證無效') {
              this.$emit('auth', false, '');
            }
          });
      }
    },
    sort(index) {
      this.sortingStatus.splice(index, 1, !this.sortingStatus[index]);
      const sortScreenedStocks = [...this.screenedStocks];
      function merge(A, p, q, r) {
        const L = A.slice(p, q + 1);
        const R = A.slice(q + 1, r + 1);
        const conditionCategory = { conditions: [] };
        conditionCategory.conditions[index] = { val: Infinity };
        L.push(conditionCategory);
        R.push(conditionCategory);
        const array = A;
        let i = 0;
        let j = 0;
        for (let k = p; k <= r; k += 1) {
          if (L[i].conditions[index].val <= R[j].conditions[index].val) {
            array[k] = L[i];
            i += 1;
          } else {
            array[k] = R[j];
            j += 1;
          }
        }
      }
      function mergeSort(A, p, r) {
        if (p < r) {
          const q = Math.floor((r + p) / 2);
          mergeSort(A, p, q);
          mergeSort(A, q + 1, r);
          merge(A, p, q, r);
        }
      }
      mergeSort(sortScreenedStocks, 0, sortScreenedStocks.length - 1);
      if (this.sortingStatus[index]) sortScreenedStocks.reverse();
      this.screenedStocks = sortScreenedStocks;
    },
    getTrackedStocks() {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.get(api)
        .then((res) => {
          this.trackedStocks = res.data.data;
        })
        .catch({});
    },
    addTrackedStock(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.post(api, { trackedStock: stockNo })
        .then(() => {
          this.getTrackedStocks();
        })
        .catch({});
    },
    deleteTrackedStock(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.delete(api, { data: { trackedStock: stockNo } })
        .then(() => {
          this.getTrackedStocks();
        })
        .catch({});
    },
    getChoseStockLists() {
      const api = `${process.env.VUE_APP_API_PATH}chose-stock-lists`;
      this.$http.get(api)
        .then((res) => {
          this.choseStockLists = res.data.data;
        })
        .catch({});
    },
    addChoseStockList() {
      if (this.tempListTitle === '') this.tempListTitle = this.tempListId;
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        if (this.choseStockLists[i].id === this.tempListId) {
          this.choseStockLists[i].title = this.tempListTitle;
          this.choseStockLists[i].conditions = this.choseConditions;
        }
      }

      const api = `${process.env.VUE_APP_API_PATH}chose-stock-lists`;
      this.$http.post(api, { choseStockLists: this.choseStockLists })
        .then(() => {
          $('#choseStockListModal').modal('hide');
          this.getChoseStockLists();
        })
        .catch({});
    },
    chooseListALLConditons(list) {
      list.conditions.forEach((condition) => {
        if (condition.isChose === false) this.chooseCondition(condition);
      });
    },
    deleteListCondition(list, conditionIndex) {
      list.conditions.splice(conditionIndex, 1);

      const api = `${process.env.VUE_APP_API_PATH}chose-stock-lists`;
      this.$http.post(api, { choseStockLists: this.choseStockLists })
        .then(() => {
          this.getChoseStockLists();
        })
        .catch({});
    },
    goBlankStock(stockNo) {
      const { href } = this.$router.resolve(`/stock/${stockNo}`);
      window.open(href, '_blank');
    },
  },
  created() {
    this.getTrackedStocks();
    this.getChoseStockLists();
  },
  mounted() {

  },
  watch: {
    choseStockLists() {
      if (this.choseStockLists.length) {
        this.tempListId = this.choseStockLists[0].id;
      }
      // Initialize chose status from  all list conditions.
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        for (let j = 0; j < this.choseStockLists[i].conditions.length; j += 1) {
          this.choseStockLists[i].conditions[j].isChose = false;
          for (let k = 0; k < this.choseConditions.length; k += 1) {
            if (this.choseStockLists[i].conditions[j].type === this.choseConditions[k].type
            && this.choseStockLists[i].conditions[j].tm === this.choseConditions[k].tm) {
              this.choseStockLists[i].conditions[j].isChose = true;
            }
          }
        }
      }
    },
    tempListId() {
      for (let i = 0; i < this.choseStockLists.length; i += 1) {
        if (this.choseStockLists[i].id === this.tempListId) {
          this.tempListTitle = this.choseStockLists[i].title;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import '~@/assets/scss/utils/variables';
.menu{
  .active{
    color: $secondary;
  }
}
.panel{
  height: 500px;
  overflow-y: auto;
}
.panel-chose{
  height: 445px;
  overflow-y: auto;
}
.loader-wrap {
  height: 50px;
}
.animated{
  transition: all 0.2s ease;
  &.animated-rotate{
    transform: rotate(180deg);
  }
}
.choseStockList .nav-link{
  color: $muted;
  border-bottom: 2px solid transparent;
  &.active, &:hover{
    color: $primary;
    border-bottom: 2px solid $primary !important;
  }
}
</style>
