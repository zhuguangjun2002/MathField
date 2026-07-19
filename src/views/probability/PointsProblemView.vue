<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import PointsProblemDemo from '../../demos/PointsProblemDemo.vue'
</script>

<template>
  <ConceptPage slug="points-problem">
    <h2><span class="sec-no">壹</span>困境：一场散场的赌局，一笔分不清的赌注</h2>
    <p>
      1654 年，巴黎。骑士德·梅雷——一位嗜赌的贵族——向他的数学家朋友<strong>帕斯卡</strong>抛出一个难题：
      两人赌博，约定先胜三局者拿走全部赌注。赌到甲 2:1 领先时有急事散场，赌注该怎么分？
    </p>
    <p>
      按已胜局数 2:1 分？可乙觉得冤——再赌下去他未必输。全给甲？乙更不干。对半分？甲明明领先。
      这问题其实已经悬了一百六十年：1494 年帕乔利（就是发明复式记账的那位）主张按已胜局数分，
      后来卡尔达诺、塔尔塔利亚都试过手，全都<strong>各执一词、互相矛盾</strong>。
      卡在哪里？所有人都盯着<strong>已经发生的过去</strong>，而过去根本不含答案。
    </p>
    <div class="story">
      <div class="story-title">📜 1654 年夏 · 数学史上最著名的通信</div>
      <p>
        帕斯卡写信给图卢兹的法官<strong>费马</strong>，两人你来我往数封信，各自用不同方法算出了同一个答案：
        赌注应按 <strong>3:1</strong> 分给领先者。费马的办法直截了当：赌局虽然停了，
        但<strong>假想把剩下的局赌完</strong>，把未来所有等可能的结局一一列举，数一数各自的赢面。
        帕斯卡则发明了递推法（一步步倒推每个局面的价值），还为此把"帕斯卡三角"运用得出神入化。
        概率论没有漫长的史前史——<strong>它就诞生在这几封信里</strong>。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：别数过去，数未来的等可能结局</h2>
    <p>思想转折就一句话，但它值一整门学科：</p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：赢面 = 有利结局占等可能结局的比例</div>
      <p>
        "运气"没法度量，但<strong>结局可以数</strong>。把未来拆成若干个"机会均等"的基本结局，
        对你有利的占几分之几，你的赢面就是几分之几——这个比例，后人称之为<strong>概率</strong>。
        赌注按赢面分配，双方都无话可说：这不是和稀泥，是数出来的公平。
      </p>
    </div>
    <p>
      注意这一步悄悄完成的观念革命：在此之前，未来是神明的领地，骰子是占卜的工具；
      在此之后，<strong>不确定性本身成了可以计算的对象</strong>。伽利略的同代人算过几个骰子问题，
      但把"未来的可能性"当成一个可交易、可分割的量（赌注的公平份额），是 1654 年的全新发明——
      三年后惠更斯把它命名为"赌局的价值"，那就是<strong>期望</strong>的前身（第四讲的主角）。
    </p>
    <p>
      但"等可能"三个字是滑铁卢多发地段。大数学家<strong>达朗贝尔</strong>后来在百科全书里翻车：
      掷两枚硬币，结果不是"两正、两反、一正一反"三种吗？所以各占 1/3？——错。
      "一正一反"其实是两种结局（甲正乙反、甲反乙正）合并的，真概率是 2/4。
      <strong>等可能不能拍脑袋认定，要拆到不能再拆的基本结局才算数。</strong>下面亲手数一次。
    </p>

    <h2><span class="sec-no">叁</span>亲手分一次赌注</h2>
    <PointsProblemDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（古典概率，拉普拉斯 1812 定型）</div>
      <p>
        设试验的所有可能结果构成有限集 <MathInline tex="\Omega = \{\omega_1, \dots, \omega_n\}" />（样本空间），
        且各结果<strong>等可能</strong>。事件 A 是 Ω 的子集，其概率定义为
      </p>
      <MathBlock tex="P(A) = \frac{|A|}{|\Omega|} = \frac{\text{A 包含的基本结局数}}{\text{全部基本结局数}}" />
    </div>
    <p>逐词拆解，每个成分都在防一个历史陷阱：</p>
    <ul>
      <li>
        <strong>样本空间 Ω 要先摆出来</strong>——概率永远是"相对于哪一份完整清单"而言的。
        帕乔利们吵不出结果，就是因为谁也没把清单列全；
      </li>
      <li>
        <strong>"等可能"写在前提里，不在结论里</strong>——它是这个定义的适用条件，不是它能证明的东西。
        达朗贝尔的 1/3 错在清单没拆到底，混进了"粗细不均"的结局；
      </li>
      <li>
        <strong>事件 = 子集</strong>——这个不起眼的选择意义深远：事件的"或、且、非"变成了集合的并、交、补，
        概率的运算从此有语法可依。1933 年柯尔莫哥洛夫的公理化（第三讲细说）保留的正是这套骨架，
        只是把"数个数"换成了更一般的"量长度"。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：从赌桌到整个不确定世界</h2>
    <ul>
      <li>
        <strong>组合计数成了概率的算术</strong>：数结局要用排列组合，帕斯卡三角、二项式系数从此和概率结缘——
        第五讲棣莫弗逼近二项系数时，会顺手撞见正态分布；
      </li>
      <li>
        <strong>期望的种子已经种下</strong>："赌注的公平份额"推广开就是"随机收益的公平价格"，
        惠更斯 1657 年写进了第一本概率教科书。保险、年金、彩票定价，全是点数分配问题换了行头；
      </li>
      <li>
        <strong>方法论的胜利</strong>：费马"列举未来"的思路，就是今天算法里的穷举法与决策树；
        帕斯卡"逐局面倒推价值"的递推法，正是动态规划的雏形——你在计算数学里见过它的无数变身。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>概率论教科书的第一章</strong>为什么总在讲排列组合和古典概型？因为那就是学科出生时的样子。
        但你也已经看见它的局限：靠"数个数"定义概率，必须<strong>有限、等可能</strong>——
        掷一根针、等一班车、量一次身高，结局无穷多且各不等可能，这套办法立即失灵。
        怎么办？答案要等到第三讲；而"拿到部分信息后概率怎么变"，下一讲就来。
      </p>
    </div>
  </ConceptPage>
</template>
