<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import BayesDemo from '../../demos/BayesDemo.vue'
</script>

<template>
  <ConceptPage slug="bayes">
    <h2><span class="sec-no">壹</span>困境：概率是死的，信息是活的</h2>
    <p>
      上一讲的概率是"开赌前"算好的。可现实中的不确定性从来不是一锤子买卖：
      医生看到检测结果、法官听到新证词、天文学家收到新观测——<strong>拿到新信息之后，
      原来算的概率还作数吗？该怎么改？</strong>
    </p>
    <p>
      18 世纪的说法把这叫"逆概率"问题：正向的概率好算——已知袋里黑白球各半，摸出黑球的概率是 1/2；
      难的是<strong>反向</strong>——摸了五次全是黑球，袋子里的配比该信什么？
      从"原因推结果"到"结果猜原因"，方向一倒，整个 18 世纪的概率论都不会算了。
    </p>
    <div class="story">
      <div class="story-title">📜 1763 年 · 一份死后才发表的遗稿</div>
      <p>
        英国长老会牧师<strong>托马斯·贝叶斯</strong>生前几乎没发表过数学著作。他去世后，
        朋友<strong>理查德·普莱斯</strong>在他的遗物里翻出一篇论文，整理后提交皇家学会——
        《机会学说中一个问题的解》，里面正是"看到结果后如何回推原因"的算法。
        贝叶斯本人可能都没觉得它多重要。半个世纪后，<strong>拉普拉斯</strong>独立重建并大规模应用了这套方法：
        估计彗星轨道、判断陪审团误判率、甚至计算"太阳明天升起的概率"。
        今天它的名字刻在整个机器学习行业的门楣上。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：新信息 = 换一个更小的样本空间</h2>
    <p>
      钥匙藏在一个不起眼的动作里。"已知 B 发生了"意味着什么？意味着<strong>所有 B 之外的结局都被划掉了</strong>——
      世界从整个 Ω 缩小成了 B。概率要在这个缩小的世界里<strong>重新归一</strong>：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：条件概率就是"缩圈重算"</div>
      <p>
        原来 A 的概率是"A 的面积占全图的比例"；得知 B 发生后，图缩成了 B，
        A 只剩下与 B 重叠的部分——新概率 = <strong>重叠面积 ÷ B 的面积</strong>。
        这就是 <MathInline tex="P(A \mid B) = P(AB)/P(B)" /> 的全部含义：分母 P(B) 不是凭空出现的，
        它是"新世界的总面积"，除以它是在新世界里重新校准量尺。
      </p>
    </div>
    <p>
      "逆概率"随之破解。想知道 P(原因 | 结果)，而手里只有 P(结果 | 原因)？
      两个条件概率共享同一块重叠面积 P(结果 且 原因)，所以它们能互相换算——换算式就是贝叶斯公式。
      直觉上更简单：<strong>把一千个人摆出来数一数</strong>。下面这个例子曾让无数医生翻车：
      某种病的患病率是 1%，检测的灵敏度 90%（病人里九成能查出来）、误报率 9%
      （健康人里有 9% 会被误判为阳性）。你拿到一份阳性报告，患病概率是多少？
      绝大多数人脱口而出"九成"。<strong>数数看。</strong>
    </p>
    <p>
      找 1000 个人来。患病率 1%，所以其中<strong>10 个是真病人、990 个是健康人</strong>。
      检测跑一遍：
    </p>
    <ul>
      <li>10 个病人里，灵敏度 90% 查出 <strong>9 个阳性</strong>（漏掉 1 个）；</li>
      <li>990 个健康人里，误报率 9% 冤枉了 <strong>约 89 个</strong>（<MathInline tex="990 \times 0.09 = 89.1" />），他们也是阳性。</li>
    </ul>
    <p>
      现在把所有拿到阳性报告的人叫到一间屋子里，一共 <MathInline tex="9 + 89 = 98" /> 人。
      其中真病人有几个？<strong>9 个。</strong>
    </p>
    <MathBlock tex="P(\text{患病} \mid \text{阳性}) = \frac{9}{9 + 89} = \frac{9}{98} \approx 9.2\%" />
    <p>
      <strong>不是九成，是不到一成</strong>——相差十倍，而且方向完全反了。
      道理一眼可见：<strong>健康人的基数太大</strong>，哪怕误报率只有 9%，
      990 个健康人也能产出 89 个"虚惊者"，把 9 个真病人淹没了。
      "检测有多准"（<MathInline tex="P(\text{阳}\mid\text{病})" />）和
      "阳了有多险"（<MathInline tex="P(\text{病}\mid\text{阳})" />）是两个完全不同的数，
      <strong>把前者当后者用，就是本讲要防的那个错</strong>。
      下面的动画把这 1000 个人画出来，三根滑杆可以随便改——
      特别值得试的是把患病率拉高（比如高危人群复查），同一份检测的含金量会立刻大变。
    </p>

    <h2><span class="sec-no">叁</span>亲手数一数一千个人</h2>
    <BayesDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（条件概率）</div>
      <p>设 <MathInline tex="P(B) > 0" />，在 B 发生的条件下 A 的条件概率定义为</p>
      <MathBlock tex="P(A \mid B) = \frac{P(AB)}{P(B)}" />
      <p><strong>贝叶斯公式</strong>：把分子按乘法公式展开、分母按全概率公式展开，得</p>
      <MathBlock tex="P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B \mid A)\, P(A) + P(B \mid \bar{A})\, P(\bar{A})}" />
    </div>
    <p>
      "展开一下就得到"这句话该兑现——而且展开的过程只有两行，
      比公式本身好记得多。顺带还能捡到一个更好用的写法，
      它会让下面那个法庭上的故事变得一目了然：
    </p>
    <RevealBox
      title="🔍 两行推出贝叶斯公式，外加一个把分母整个消掉的写法"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：条件概率的定义是 <MathInline tex="P(A|B) = P(AB)/P(B)" />。
        把这个定义<strong>反过来用一次</strong>（换成"已知 A 求 B"），
        能得到关于 <MathInline tex="P(AB)" /> 的什么等式？
        再想想分母 <MathInline tex="P(B)" />：B 要发生，
        <strong>一共有几条路</strong>可走？
      </template>
      <p>
        <strong>第一步：分子。</strong>把定义两边同乘 <MathInline tex="P(B)" />，
        得<strong>乘法公式</strong> <MathInline tex="P(AB) = P(A|B)P(B)" />。
        同一件事换个方向再写一次（把 A、B 的角色对调）：
      </p>
      <MathBlock tex="P(AB) = P(B \mid A)\, P(A)" />
      <p>
        重点是 <strong><MathInline tex="P(AB)" /> 只有一个</strong>——
        "既患病又阳性的人"这一群人是客观存在的，
        你既可以说它是"病人里的九成"，也可以说它是"阳性者里的某个比例"。
        <strong>两个条件概率之所以能互相换算，就是因为它们共用这同一块重叠</strong>。
      </p>
      <p>
        <strong>第二步：分母。</strong>B 要发生，只有两条互不重叠的路——
        经由 A，或经由 <MathInline tex="\bar A" />。把这两条路的流量加起来
        （这叫<strong>全概率公式</strong>）：
      </p>
      <MathBlock tex="P(B) = P(BA) + P(B\bar A) = P(B|A)P(A) + P(B|\bar A)P(\bar A)" />
      <p>
        把两步的结果代进 <MathInline tex="P(A|B) = P(AB)/P(B)" />，贝叶斯公式就出来了。
        对照刚才那 1000 个人：分子 <MathInline tex="P(B|A)P(A)" /> 是
        <MathInline tex="0.9 \times 0.01 \times 1000 = 9" /> 个真阳性，
        分母两项分别是 9 和 <MathInline tex="0.09\times0.99\times1000 = 89" />。
        <strong>公式一个字都没多，就是那间屋子里的点名册。</strong>
      </p>
      <p>
        <strong>第三步：一个更好用的写法——把分母消掉。</strong>
        分母那一长串是"归一化常数"，繁琐且容易算错。
        办法是<strong>不看概率，看几率</strong>（odds，即"有 : 无"的比）。
        把 A 和 <MathInline tex="\bar A" /> 的两个后验相除，
        分母完全相同，直接约掉：
      </p>
      <MathBlock tex="\underbrace{\frac{P(A|B)}{P(\bar A|B)}}_{\text{后验几率}} = \underbrace{\frac{P(A)}{P(\bar A)}}_{\text{先验几率}} \times \underbrace{\frac{P(B|A)}{P(B|\bar A)}}_{\text{似然比}}" />
      <p>
        <strong>这一行是贝叶斯定理最实用的形态</strong>，因为它把整件事说成了一句大白话：
        <strong>新证据不是给你一个新答案，而是给你原来那个答案乘上一个倍数</strong>。
        这个倍数（似然比）只关心"这条证据在两种假设下各有多大可能出现"，
        跟先验无关；而先验也不用重算，乘上去即可。
      </p>
      <p>
        拿刚才的体检验一遍：先验几率是 <MathInline tex="10:990 = 1:99" />；
        似然比是 <MathInline tex="0.9 / 0.09 = 10" />；
        后验几率就是 <MathInline tex="10:99" />，化成概率
        <MathInline tex="10/109 \approx 9.2\%" />——和数人头的答案一致。
        <strong>请记住这个"乘倍数"的形状</strong>，
        伍节那桩冤案的全部问题，就是有人只报了倍数、绝口不提先验。
      </p>
    </RevealBox>
    <p>逐词拆解：</p>
    <ul>
      <li>
        <strong>为什么是"定义"不是"定理"</strong>：缩圈重算是我们<strong>选择</strong>的更新规则，
        数学里它被采纳为定义——因为在等可能模型里它恰好等于"在 B 里数 A"，与直觉严丝合缝；
      </li>
      <li>
        <strong>P(B) &gt; 0 的小字</strong>：零面积的世界没法做分母。连续情形"已知 X 恰好等于 x"
        条件概率照样有意义（密度版条件化），但那需要极限来救场——又是微积分的地盘；
      </li>
      <li>
        <strong>贝叶斯公式无一多余</strong>：分子 <MathInline tex="P(B|A)P(A)" /> 是"经由 A 产生证据 B"的流量，
        分母是"所有渠道产生 B"的总流量——后验概率就是<strong>你这条渠道占的流量份额</strong>。
        动画里深红除以（深红+金色），就是这个式子的人数版；
      </li>
      <li>
        <strong>先验 P(A) 无处可逃</strong>：想从 P(B|A) 换算出 P(A|B)，必须掏出 P(A)。
        检测准不准是实验室的事，患病率高不高是流行病学的事，两者缺一不可——
        这也是贝叶斯方法三百年来争议的焦点：先验从哪来？（拉普拉斯的回答：没有信息时就均匀分。）
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一台信念更新的机器</h2>

    <h3>七千三百万分之一：一个把母亲送进监狱的数字</h3>
    <p>
      前面那个体检的例子，代价是虚惊一场。下面这一次，代价是三年牢狱和一条人命。
      而错误的形状<strong>一模一样</strong>。
    </p>
    <div class="story">
      <div class="story-title">📜 1999 年 · 英国，萨莉·克拉克案</div>
      <p>
        英国律师<strong>萨莉·克拉克</strong>的两个儿子先后在襁褓中猝死
        （1996 年与 1998 年，相隔约一年）。她被控谋杀。
        庭上一位著名的儿科专家作证说：
        像她这样的家庭（不吸烟、经济宽裕、母亲年龄超过 26 岁），
        一个婴儿发生猝死综合征的概率是 1/8543，那么<strong>两个都猝死的概率就是</strong>
      </p>
      <MathBlock tex="\Bigl(\frac{1}{8543}\Bigr)^2 = \frac{1}{72{,}982{,}849} \approx \frac{1}{7300\,\text{万}}" />
      <p>
        他补了一句让陪审团印象极深的话：这相当于连中四次赛马大赛的头奖。
        克拉克被判有罪，入狱。<strong>2001 年英国皇家统计学会专门发表声明</strong>，
        指出这个数字在统计上站不住脚；2003 年她的定罪被推翻，
        坐了三年牢后出狱，2007 年去世，年仅 42 岁。
      </p>
    </div>
    <p>
      那个数字错在哪儿？<strong>错了两层，而且第二层正是本讲的正题。</strong>
    </p>
    <p>
      <strong>第一层错：把相乘当成了理所当然。</strong>
      <MathInline tex="(1/8543)^2" /> 这个平方，用的是<strong>独立性</strong>——
      而独立性是本讲末尾要定义的一个<strong>很强的假设</strong>，不是默认状态。
      同一个家庭的两个孩子共享基因、共享居住环境、共享同一套育儿习惯，
      凭什么认为第一个孩子猝死这件事完全不改变对第二个的判断？
      后续研究恰恰相反：<strong>家里已经发生过一次婴儿猝死，第二次的风险会明显升高</strong>。
      这一层错让分子被严重低估。
    </p>
    <p>
      <strong>第二层错：只报了一个数，却没有第二个数可比——这就是"检察官谬误"。</strong>
      退一万步，就算 1/7300 万完全正确，它回答的是
    </p>
    <MathBlock tex="P(\text{两个孩子都猝死} \mid \text{母亲无罪})" />
    <p>
      可陪审团要判的是<strong>反过来那个</strong>：
      <MathInline tex="P(\text{母亲有罪} \mid \text{两个孩子都死了})" />。
      <strong>这正是本讲从头到尾在防的那次方向颠倒</strong>，
      和"检测灵敏度 90%"被当成"阳性者九成有病"是同一个错，
      只不过这次坐在被告席上的是一个刚失去两个孩子的母亲。
    </p>
    <div class="insight">
      <div class="insight-title">💡 用上面那个"乘倍数"的写法，三行看清问题</div>
      <p>
        用几率形式，要判的是<strong>有罪与无罪的比</strong>：
      </p>
      <MathBlock tex="\frac{P(\text{有罪}\mid\text{两死})}{P(\text{无罪}\mid\text{两死})} = \frac{P(\text{有罪})}{P(\text{无罪})} \times \frac{P(\text{两死}\mid\text{有罪})}{P(\text{两死}\mid\text{无罪})}" />
      <p>
        专家给的那个 1/7300 万，只是<strong>右边那个分式的分母</strong>，
        而且是<strong>三个因子里的一个</strong>。
        另外两个他一个字也没提：
      </p>
      <ul>
        <li>
          <strong>先验几率</strong>：一位母亲连杀两个亲生婴儿，<strong>这本身也是极其罕见的事</strong>。
          罕见的事不能用来反驳罕见的事——两边都罕见时，
          要紧的是<strong>谁更罕见、罕见多少倍</strong>；
        </li>
        <li>
          <strong>分子</strong> <MathInline tex="P(\text{两死}\mid\text{有罪})" />：
          这一项从未被估计过，可它就摆在公式里。
        </li>
      </ul>
      <p>
        统计学家<strong>雷·希尔</strong>在 2004 年把三项都估了一遍，
        结论是：在英国，<strong>"两个婴儿都是自然猝死"比"两个婴儿都被谋杀"大约常见 4.5 到 9 倍</strong>。
        把这个比值代进上式：
      </p>
      <MathBlock tex="P(\text{无罪} \mid \text{两死}) = \frac{4.5}{4.5 + 1} \approx 82\% \quad\text{到}\quad \frac{9}{9+1} = 90\%" />
      <p>
        也就是说，<strong>即使只看"两个孩子都死了"这一条事实，天平也明显偏向无罪</strong>——
        而陪审团听到的却是"七千三百万分之一"。
        <strong>同一批事实，一个数字让人以为铁证如山，三个数字放在一起结论完全相反。</strong>
        这不是文字游戏：漏掉先验，等于把"这种事很罕见"偷换成了"这个人很可疑"。
      </p>
    </div>
    <p>
      <strong>同一个陷阱换张脸：DNA 证据。</strong>
      "现场 DNA 与被告匹配，随机匹配概率是百万分之一"——
      听起来像是被告有罪的概率高达 99.9999%。可这两个数根本不是一回事。
      设想警方是在一个六千万人的人口里做全库比对，那么<strong>光靠运气就会有约 60 人匹配上</strong>
      （<MathInline tex="6\times10^7 / 10^6 = 60" />），
      单凭匹配这一条，被告是真凶的概率约 <MathInline tex="1/60 \approx 1.7\%" />。
    </p>
    <p>
      当然真实案件不会这么荒唐——警方总有别的线索先把嫌疑范围缩小。
      <strong>但请注意"缩小嫌疑范围"在数学上就是提高先验</strong>：
      如果别的证据已经把范围缩到 10 个人，那么先验几率是 1:9，
      再乘上百万倍的似然比，后验几率高到毫无悬念。
      <strong>DNA 证据的分量完全取决于它之外还有什么</strong>——
      而这句话，正是本讲第肆节"先验 P(A) 无处可逃"那一条的法庭版。
    </p>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>垃圾邮件过滤</strong>：P(垃圾 | 出现"中奖"二字) ∝ P(出现"中奖" | 垃圾) × P(垃圾)——
        上世纪 90 年代末拯救了整个电子邮件生态的朴素贝叶斯分类器，就是这一行公式；
      </li>
      <li>
        <strong>机器学习的底层语法</strong>：把"原因"换成模型参数、"结果"换成数据，
        贝叶斯公式就是"用数据更新模型信念"的通用法则——后验 ∝ 似然 × 先验，整个统计推断的一半建在上面；
      </li>
      <li>
        <strong>独立性有了精确说法</strong>：若 <MathInline tex="P(A|B) = P(A)" />（知道 B 不改变对 A 的判断），
        称 A、B 独立，等价于 <MathInline tex="P(AB) = P(A)P(B)" />。
        下一讲起"独立"将是每个定理的标配假设——它的含义就在这里：<strong>信息互不相通</strong>；
      </li>
      <li>
        <strong>基率谬误疫苗</strong>：上面那两桩案子只是最有名的例子。
        机场安检、银行风控、内容审核、疾病普查——凡是"在一个巨大的、绝大多数都正常的人群里
        揪出极少数异常"的场合，都逃不掉同一笔账：<strong>基数一大，
        再精准的检测也会被假阳性淹没</strong>。所以这类系统真正的设计难点从来不是提高灵敏度，
        而是压低误报率，或者先用别的信息把人群缩小（也就是提高先验）。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>上一讲</strong>：<router-link to="/probability/points-problem">点数问题</router-link>算的是
        "开赌前"的概率，本讲算的是"看到几局之后"的概率——费马那棵树只要剪掉不符合已知战况的枝，
        剩下的就是条件概率；
        <strong>数值分析</strong>：贝叶斯公式的分母（全概率）在高维模型里是个积分，
        算不动它催生了 MCMC、变分推断等一大家族数值方法——
        它们本质上是拿<router-link to="/probability/lln">大数定律</router-link>去逼近那个积分；
        <strong>线性代数</strong>：马尔可夫链的转移矩阵每一行都是条件概率，
        "长期停留在哪"由它的<router-link to="/linear-algebra/eigen">特征向量</router-link>决定——
        那一讲 PageRank 的概率论出身在此；
        <strong>下一讲</strong>：本讲的"缩圈重算"要求分母
        <MathInline tex="P(B) > 0" />，可"身高恰好 170.0 厘米"这种事件的概率是零。
        <router-link to="/probability/distribution">第 3 讲</router-link>把"数个数"换成"量面积"，
        正是为了让这类问题有意义。
      </p>
    </div>
  </ConceptPage>
</template>
