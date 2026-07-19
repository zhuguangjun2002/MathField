<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import ContinuationDemo from '../../demos/ContinuationDemo.vue'
</script>

<template>
  <ConceptPage slug="continuation">
    <h2><span class="sec-no">壹</span>困境：级数死了，函数还活着吗</h2>
    <p>从一个你熟悉的等式说起：</p>
    <MathBlock tex="1 + z + z^2 + z^3 + \cdots = \frac{1}{1 - z}, \qquad |z| < 1" />
    <p>
      左边只在单位圆盘内收敛——|z| ≥ 1 时级数干脆利落地发散。可右边这个函数，
      除了 z = 1 一个点，<strong>整个复平面上处处有意义</strong>：z = 2 时它等于 −1，z = −3 时等于 1/4。
      级数只是函数的一件"小了几号的衣服"。于是一个自然的问题：
      <strong>如果我们手里只有那个级数（衣服），能不能恢复出整个函数（本体）？恢复出的本体是唯一的吗？</strong>
    </p>
    <p>
      这不是无聊的哲学题。19 世纪的数学家手里攥着一堆"只在半张纸上有定义"的函数——
      最著名的一个：欧拉研究素数时玩出花样的级数
      <MathInline tex="\zeta(s) = 1 + 2^{-s} + 3^{-s} + \cdots" />，只在 Re s &gt; 1 时收敛。
      想追问它更深的秘密，就必须让它活到收敛域之外去。
    </p>
    <div class="story">
      <div class="story-title">📜 1859 年 · 八页纸的遗产</div>
      <p>
        <strong>黎曼</strong>一生只写过一篇数论文章——1859 年《论小于给定数值的素数个数》，共八页。
        他把 ζ 延拓到整个复平面（只在 s = 1 留一个极点），发现素数的分布规律被编码在
        <strong>延拓后</strong>的 ζ 的零点位置里，并顺手写下一句"很可能所有非平凡零点都在直线
        Re s = 1/2 上"——这就是<strong>黎曼猜想</strong>，一百六十多年后仍是数学第一悬案。
        注意逻辑链条：没有解析延拓，ζ 在零点所在的区域<strong>根本没有定义</strong>——
        延拓不是锦上添花，是这一切故事的先决条件。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：解析函数是刚体，认一小段就认全体</h2>
    <p>延拓的可行性与唯一性，靠的都是解析函数的"刚性"：</p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：一小段决定全体</div>
      <p>
        <strong>唯一性定理</strong>：两个解析函数只要在一小段弧（甚至一列聚点）上相等，就在整个连通区域上相等。
        实函数毫无此性质——你可以把实函数的一段随意改掉再光滑接回去；解析函数不行，
        它像一块<strong>刚体</strong>：抓住一角，整体的姿态就定了（道理不神秘：一小段确定该处全部导数，
        确定泰勒级数，级数又确定邻域，邻域再向外传播——上一讲"收敛盘顶到奇点"的圆盘一个接一个铺过去）。
        所以"恢复本体"如果可行，<strong>答案必唯一</strong>——延拓不是发明，是发现。
      </p>
    </div>
    <p>
      操作上就是动画里的"圆盘接力"：在收敛盘边缘附近取新中心重新展开，新盘伸出旧盘之外；
      一步一盘，函数的领土不断扩张，直到被"天然边界"（奇点连成墙）挡住为止。
      对 <MathInline tex="1/(1-z)" />，墙只有 z = 1 一块砖，绕过去畅通无阻。
    </p>
    <p>
      回到开篇那句"胡话"。ζ 延拓到 s = −1 处的值是 <MathInline tex="\zeta(-1) = -\tfrac{1}{12}" />。
      而<strong>若</strong>把定义级数硬代入 s = −1，形式上就是 1+2+3+⋯。所以那句网红等式的严格版本是：
      <strong>"1+2+3+⋯ = −1/12"错；"ζ 的解析延拓在 −1 处取值 −1/12"对</strong>——
      等号左右两边住在不同的数学句子里。物理学家在弦论、卡西米尔效应里用这个值，
      用的正是延拓值（且实验验证了它），不是真的把正整数加出了负数。
    </p>

    <h2><span class="sec-no">叁</span>亲手铺一条圆盘链</h2>
    <ContinuationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（解析延拓）与定理（唯一性）</div>
      <p>
        设 f 在区域 D 内解析，<MathInline tex="D \subset D'" />。若存在 D′ 内解析的 F 使
        <MathInline tex="F|_D = f" />，称 F 为 f 到 D′ 的<strong>解析延拓</strong>。
      </p>
      <p>
        <strong>唯一性定理</strong>：若 f、g 在连通区域 Ω 内解析，且在 Ω 内某个<strong>有聚点</strong>的点集上相等，
        则 f ≡ g 于 Ω。因此解析延拓（若存在）唯一。
      </p>
    </div>
    <p>小字里的门道：</p>
    <ul>
      <li>
        <strong>"有聚点"是命门</strong>：在孤立的点列上相等不够（sin πz 与 0 在所有整数处相等却不同）——
        点得"挤"在一起，挤出一个极限点，才能榨出全部导数信息；
      </li>
      <li>
        <strong>"连通"也不能少</strong>：两个互不相连的区域各自为政，一边定死不了另一边；
      </li>
      <li>
        <strong>延拓可能失败</strong>：有的函数四面都是"墙"——如 <MathInline tex="\sum z^{2^n}" />
        在单位圆的每一点都奇异（自然边界），一步也延拓不出去。能不能出去，是函数自己的性质；
      </li>
      <li>
        <strong>绕不同的路可能到不同的"层"</strong>：对 <MathInline tex="\sqrt{z}" />、log z，
        绕原点一圈延拓回出发点，函数值差了一个分支（log 多了 2πi）——上一讲"辐角绕圈回不来"的老朋友。
        黎曼的解法石破天惊：那就让定义域本身变成多层的螺旋面（<strong>黎曼面</strong>）——
        与其说函数多值，不如说平面太小。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：全课收官，两张门票</h2>
    <ul>
      <li>
        <strong>ζ 与素数</strong>：延拓 + 留数（ζ 在 s=1 的极点）+ 围道积分，合力证明了素数定理
        （素数个数 ~ x/ln x，1896）——本课四讲的武器在数论战场上会师。黎曼猜想悬赏百万美元，入口就在这讲；
      </li>
      <li>
        <strong>特殊函数的标准出厂流程</strong>：Γ 函数从阶乘延拓而来（<MathInline tex="\Gamma(1/2) = \sqrt{\pi}" />
        ——阶乘竟然能取半整数），贝塞尔、勒让德函数（数理方程课的常客）都靠延拓获得完整定义域；
      </li>
      <li>
        <strong>物理的"重整化"直觉</strong>：卡西米尔效应、弦论维数 26 的推导里出现的 ζ(−1) = −1/12，
        是解析延拓在物理中的正式上岗——发散求和的"正确答案"由延拓值给出；
      </li>
      <li>
        <strong>全课地图</strong>：虚数被三次方程逼出（壹）→ 复可导 = 局部旋转伸缩（贰）→
        解析函数全息、积分只看奇点（叁、肆）→ 一小段决定全体（伍）。一以贯之的主题：
        <strong>复解析是一种极强的刚性</strong>，苛刻的准入条件换来不可思议的整体性质。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 通往最后一门课的桥</div>
      <p>
        复变函数到此收官，下一站是<strong>数学物理方程</strong>——你没学过的那门课，但门票已经备齐：
        解析函数的实部虚部满足拉普拉斯方程（第二讲的赠品）、柯西积分公式 = 调和函数平均值性质（第三讲）、
        傅里叶变换的反演靠留数（第四讲）、特殊函数靠延拓（本讲）。三大方程的故事将把微积分、线代、
        概率、复变全部串起来——整个网站的概念在那里大会师。
      </p>
    </div>
  </ConceptPage>
</template>
