const deadlines = [
    '2020-11-17 00:00:00',
    '2020-11-18 00:00:00',
    '2020-11-19 00:00:00',
    '2020-11-20 00:00:00',
];

const submitTimes = [
    '2020-11-11 09:00:00',
    '2020-11-12 09:00:00',
    '2020-11-13 09:00:00',
    '2020-11-24 09:00:00',
];

const requirements=[
    '<p><br/><strong>作业要求及评分</strong></p><p>1.</p><p>读取overlapping.tri和intersecting.tri文件中三角形信息，创建顶点和图元，分别绘制如图1(b)和图2(b)所示的渐变色填充的三角形</p><p>(20&#x27;)</p><p></p><p>2.</p><p>实现扫描线填充算法（不用OpenGL的深度检测），保证三角形前后覆盖关系正确</p><p>(30&#x27;)</p><p></p><p>3.</p><p>写一个depth分段函数，用你实现的填充算法绘制图3中8个矩形的编织效果</p><p>(35&#x27;)</p><p></p><p>4.</p><p>作业报告文档（详见文档要求）</p><p>(15&#x27;)</p><p></p><p>实现目标</p><p>           矩形的编织效果填充算法</p><p style="text-align:start;text-indent:2em;">     每个矩形720*80</p><p style="text-align:start;text-indent:2em;">     经纬方向的矩形颜色分别为（112，48，160），（68，114，196）</p><p style="text-align:start;text-indent:2em;">     经纬矩形间距80 pixel，背景色为（255，255，255）</p><p></p><div class="media-wrap image-wrap float-left" style="float:left"><img src="data:image/png;base64,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"/></div><p></p>'

];

const contents = [
    '<p>c++执行情况如图</p><div class="media-wrap image-wrap"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAADUCAYAAAA82zx+AAAdl0lEQVR4Xu2du3ccx5WHb0mW9xx7KUrgA3rwNQRmSO3RX0D8BQQSRsokUpTN8a5lDygbmZRthoQIwUypIu4DgC3ba+/aoB9rZz4KMDhng02ULQXKlt+1p7unZ7qnH1X9munu+RiRnK6qe79b3b+uR9dVLz7/Ff13W7+RTz94TfgDAQhAAAIQmCcBtXT6q/rL3/01ojTPKNA2BCAAAQi4BBAlOgIEIAABCNSGAKJUm1BgCAQgAAEIqDMvntLPvfer8PTdjQcyPBzI6oiPUmpM6t6+lt2bo38e78had1Mel8Fxqs1glQd9JesPy2iEOiAAAQhAoM4E1NmlU/pL94OidEMeDA9lY29NupthuXEFqesLkXfdYNgXVZViuEK1IXtrXZkypc5MsQ0CEIAABHISUOeWntfP3v9lYKR0T/b1lhxFhCDm/+/ti97tyk5FouGKoFQoejmhUQwCEIAABKohoM6fOa2f2fyFWZRcARLpq3XxZtJGI6VVkfD0miNeu3Kz6NTeaDpvyNRdNZGnVghAAAI1JDAZKf3v/4geLxaFVnREqXURR5S2jrw1pLFgrMnR1qH0toNrPuWI0o0HQznc2CtvzaqG8DEJAhCAAATCBGLWlBKm70ai1N/bkN2BjKbsvNFSWJTKQOwJmzBKKgMmdUAAAhBoDAG1dPqU/vJ3gxsdUkTJGUmFpuWqEQ9GSY3pPxgKAQhAoFQC6swLp/Rz37EQpbg1Hvf/erI9XmcqwzZP6Lo70d1/ZdROHRCAAAQgUF8C6tzSaf3sfYuNDuIsK9lsCS+4phTZUFFfeFgGAQhAAALlElDnl17Qz9z/uXn3ndvuZMed+8+DuO3aRUSJUVK54aU2CEAAAs0iECNKzXIAayEAAQhAoD0EEKX2xBJPIAABCDSeQMyaUuN9wgEIQAACEGgoAXX2xef1l94LHjPUUE8wGwIQgAAEGk8AUWp8CHEAAhCAQHsIMH3XnljiCQQgAIHGE2Ck1PgQ4gAEIACB9hBAlNoTSzyBAAQg0HgC8dN3KZlnJx/QHgTSWJTJIfyB7jHHDZUJl7ogAAEI1JpAzEgpOfOsm77CSeq3M5TBIJhbqSwfOdGhLJLUAwEIQKCJBGJEKS3z7C155By+WtH5dGSabWIXwmYIQAAC5RHIIEqBRlNFKe/Zd1XlZioPFjVBAAIQgEC1BCaiZMo8G7SjElEajdD6e7KxO5BVt73jUTLBaiFQOwQgAAEI1INAptQVY5OrmL7zN1cEkgi6yf4Gw4o2VNQjAFgBAQhAAAITAvURJYlby6omsy0dAAIQgAAE6kkgYz6lkRNVjJRcUdp1tvTJ+kMfVtKmi3rCxCoIQAACEChGQC2feVGrzceWSf5sRCnvRgcRd7puY0/WupvyOJLptpijlIYABCAAgfoTUMtnl7QaHFqI0lTW2bFv05sR8ouSU6W7LfzmqPLA+lL9UWIhBCAAAQgUJaBePn9G62/9LCBKRaukPAQgAAEIQCAfAfXK8ln9t3d/iijl40cpCEAAAhAokYB6dfmc/uu7/4UolQiVqiAAAQhAIB8BRCkfN0pBAAIQgEAFBBClCqBSJQQgAAEI5COgLrx0Xv/lm//J9F0+fpSCAAQgAIESCagLLy/rv/zTTxClEqFSFQQgAAEI5COgLr6yrP/8j4hSPnyUggAEIACBMgnEj5RSM8+W0bz/IS6ngJdBkzogAAEItIVAjCilZJ4tyWvvOCGR41WRvbWubDpnCvEHAhCAAAQWnoC69OpL+k/f+LHFMUNlsfIPWd2W3uGWHCFKZYGlHghAAAKNJ5BDlEo42076otZF9jWi1PgehAMQgAAESiQwESXrzLMFRMldq+rJtlqXh7H5k0r0jKogAAEIQKBxBNSlV1/Rf/rGj2YwfTe9VkWupMb1FgyGAAQgUDEBdfnCq/qP/R9WL0pOYsCto3GuJGGkVHFoqR4CEIBA8wioKxcu6D/0f1C5KIXyJE1zIm9S83oOFkMAAhCogEAOUSqwphRygOm7CuJJlRCAAAQaTUB1Ll7QX9zLMlJClBodcYyHAAQgUGMCqnPxov7i3secfVfjIGEaBCAAgUUhoDqXLusvvv49RGlRIo6fEIAABGpMQF29fEX//msHiFKNg4RpEIAABBaFgFrtdPTnd/cRpUWJOH5CAAIQqDEB1e1c1U/v7iFKNQ4SpkEAAhBYFAKqt7KqT+78G6K0KBHHTwhAAAI1JoAo1Tg4mAYBCEBg0Qio3tUVffL2vzNSWrTI4y8EIACBGhKIF6WKMs+6yf0GqxMMB04Ki4c1xIJJEIAABCAwDwIx03fVZ571HPVOhpC+EnRpHqGnTQhAAAL1I6Be6/X0/735L5UfyBp1fVbiVz/oWAQBCEAAAvEE1PVuTz95K4solXT2nTtFuCF7pEOnb0IAAhCAwIjARJRmkXnWmbTb17J702v9eGdNupuPCQYEIAABCEDAJZBjpFQWOW/6bjBks0NZRKkHAhCAQNMJzFGU3GGTeHsd1oU9eE3vStgPAQhAoDiB+YtSKEV6cYeoAQIQgAAEmksghyiVtNFhtCW8y7pSc3sPlkMAAhAomcAMRWm0hhT6dpZvlEqOJ9VBAAIQaDQBdb3X009C3yk12h+MhwAEIACBBhNQ13vX9JM3H3H2XYODiOkQgAAE2kJAXev19GeMlNoST/yAAAQg0GgCqtft6ZPQiQ6N9gfjIQABCECgwQRUb7WrT27/K9N3DQ4ipkMAAhBoCwHVXVnVT8k825Z44gcEIACBRhNQ3ZUV/fQOSf4aHUWMhwAEINASAohSSwKJGxCAAATaQECtXl3Rn0+nQ68o86yf2G90SLgImWfb0IfwAQIQgEBpBNRK56r+3d29wEaHqpLvefX2tv1THLzjijhmqLRYUhEEIACBxhOIESVHLLbkaAbJ99zcSt0dWetuClmVGt+XcAACEIBAYQIx03cmUSrrQNZRwj9EqXAQqQACEIBAWwhMRGlGmWcn4Ji+a0snwg8IQAACZRHIMVIqo2n/xPADEvyVgZM6IAABCLSEgFrpXNG/u3sQ2Ohgmr4r7rm7lnTzWHZmsG5V3FpqgAAEIACBWRFQq51L+vO735+ZKN14MJTDgSBIs4ow7UAAAhBoEIEcopR/owOC1KCegakQgAAE5kBghqI0ErMYJw/6ZKCdQ+xpEgIQgEDtCMSIUu1sxCAIQAACEFgQAqrbuayf3v0eqSsWJOC4CQEIQKDOBBClOkcH2yAAAQgsGAFEacECjrsQgAAE6kxAdTuX9NPQlvA6m4ttEIAABCDQZgKqe/WSfvp28DulNruLbxCAAAQgUGcCqrdyWZ/cYaNDnYOEbRCAAAQWhQCitCiRxk8IQAACDSCgeqtX9Mnt4Nl3IpKQedY7kWF14lYlmWOTD2uNtC8ixztr0t0kG1MD+homQgACEDASUNe6Hf3ZW/s5Ms96JzRImacx3NsXvduVnZ2hDAZO1evyMOCCK0q9bVHrwf81+sgFEIAABCDQEALqeq+jn7wZFCXbU8LLTpvutHtLHjlC5IoTotSQPoSZEIAABEojoK53O/pJaKRkKUruFN+G7EXST+Q/sHXsFaJUWoCpCAIQgECTCKjr3av6yVt78qll5lkvF5LnYvx6TsWiFFzTOt6Rte6msKLUpC6HrRCAAASSCUxE6YPXRldZjpRktCFh2C9/jSdhpBR2owTxo2dAAAIQgECtCKhrqx392e08a0oiYiUeOfy1rdf2uhwmUAQCEIAABGZPoLgobR2VP4VmKTbeFvFhZJfe7DHSIgQgAAEIlEGggCh502fdyHdCJUyr2YjS6Fsq4TulMvoBdUAAAhCoBYEMouR/1DqxOz5jbF5RitbvtXQsSnXdvwU3WTj/JmNtLfoQRkAAAhAojUCMKJVWNxVBAAIQgAAEMhFQvZWOPrkT3OiQqTwXQwACEIAABEojoHpXr+iTt6fOviuteiqCAAQgAAEI2BNAlOxZcSUEIAABCFRMAFGqGDDVQwACEICAPQHWlOxZcSUEIAABCFRMgJFSxYCpHgIQgAAE7AmobueyfnqXdOj2yLgSAhCAAASqIhAvSgmZZydG+B+6HstOJHVFXlO9OnvbSuaVwy+c2fYg8/FFRcvnJUc5j0DZ/N36NvbKP0aLgEEAAokEYkTJnLzPu1lFjlclJp9SXtrzF6Wx5TbHHKW5WbR8XoSU8wiUxB9RokNBYPYE1Grnkv787vcD6dBNqSv837eld7glRy0aKSFKs++AlbSIKFWClUohMAsCmUXJPX9OnBxKIvs6TpSKnX3X216To61D8XL5ZZ8eDJ2PlzcJYNGHWu7y0+f/ZZ9CzNdpkkfH2UYLxex32+pti3p0S/Qok2R8IkmDl7n5R89XlLx9KF8gKAWBhScwESWbzLPuWlNPttW6PJSkEVUxUXLEyD9o1RWY7o6o7qZVoCaC+XA0i+OVz5ydtsBDLf/0UTRp4ixTc0yz84GPhcK40Ffc/vGakC8Ebn/byD5FnDN+0wyyCbJVF+UiCEDAQCDDSGn6bdo0zZeVfcyakvNw2TqyFKUYe2b8UCs0/RcSfL8mT+ClX/3mj6D4BB/Ozt+3jtaku2lIOl+C/VERzul/HlGK6SuIUtZ7mOshUJyAvSiNBGIy6qiZKE3tGJygyT4FWHihPM9DMbbMDDd/jOP7ibw/vOXie9T9Z/kH2x2RJdhvPyqrYPouRlQRpeIPGGqAQFYC1qI0ncso1FAp8+4FR0p5R0VxxPKISrCePOVjy+QcKWTtBc71/kN57UhuvfGRPOodyq1HzvrehyK3u2IaKMULeTb75y9K4alCRClPR6IMBIoRsBalaDPVrCmFvlPKNH0XXdPIjSaPqBQVJXeNblduHjibSAquieVy3Gn/lhztiMhH67L5+r7oWyIHN0UeuWuIpj/F7Z+rKI34jzMpu33gprDRwRR3fodAuQRaJEru6777Aa63c2/0x3oUl5z51u4D4aLlHXtHD/bMtpfRKUb2i78xJM+GlWL2FxOlEvgHp4CdfrPdk8Oto+wbZcoIB3VAYEEJxIjSgpLAbQhAAAIQmDsBtXLlov7dOx8HPp6du00YAAEIQAACC0oAUVrQwOM2BCAAgToSQJTqGBVsggAEILCgBBClBQ08bkMAAhCoIwFEqY5RwSYIQAACC0qA3XcLGnjchgAEIFBHAohSHaOCTRCAAAQWlECmzLPhzJ4esVypBYywq8hsa2yUCyAAAQhAYM4EVO/qFX3y9kHgOyVDbh0n340xjUExr6rJbFvMJkpDAAIQgED1BFRvpaNP7uxbZZ4tdgyMrTNVZba1bZ/rIAABCEBgXgTUtdWO/ux2maKU58y0ifvmzLbzQkW7EIAABCBQNQF1rdvRn721L59aZJ6NrCnFHnZaQJSsMttWjYT6IQABCEBgXgQmovTBayMbbJP3FRCfWG+rzmw7L8S0CwEIQAACtgQKiJKTacHJOeNk67bJt2MwqfLMtrZIuA4CEIAABOZFQPVWr+iT28Hdd7YjJSdZ6VAOB8NSRKn6zLbzQky7EIAABCBgSyC/KI0SosnOmnRDubLLmtazF0dbZ7kOAhCAAATqTSCTKE2PZg76SqKfLCFK9Q451kEAAhCoL4EYUaqvsVgGAQhAAALtJhCz0aHdDuMdBCAAAQjUl4C63uvoJ28GP56tr7FYBgEIQAAC7SaAKLU7vngHAQhAoFEEmL5rVLgwFgIQgEC7CbDRod3xxTsIQAACjSKgeiuX9cmd7wVOCW+U/RgLAQhAAAItIoAotSiYuAIBCECg6QRUb+WKPrkTPGao6S5hPwQgAAEINJVATJK/prqC3RCAAAQg0HQCiFLTI4j9EIAABFpEAFFqUTBxBQIQgEDTCSBKTY8g9kMAAhBoEQFEqUXBxBUIQAACTSegrq129Ge3Ofuu6YHEfghAAAJtIMBIqQ1RxAcIQAACLSGgVjsX9ed3P+ZEh5YEFDcgAAEINJkAotTk6GE7BCAAgZYRQJRaFlDcgQAEINBkAqp79ZJ++vb3mb5rchSxHQIQgEBLCKirVy7o37/zA0SpJQHFDQhAAAJNJoAoNTl62A4BCECgZQQQpZYFFHcgAAEINJkAotTk6GE7BCAAgZYRUJ3Lr+ovvvZD1pRaFljcgQAEINBEAqpz6RX9xdd/hCg1MXqNtvme7OstOVrryubjWTnitHlLHql1eTirJmkHAhDIREBdufiy/sO9/5BPP3hHHgwPZbAaLH8gfW7gTECbdPGNB0M53NiTte6m2OrCvX0tuzdHXh7vZCo7YXPD7Wsbe2vSnVKkovWbyrs+D4b069wd1YvdYLWuz4a625cO3tR/00p7fTv0AJfjnel7LJmPXfncHce6oLp84SX9x/6Px6LU21ayPnqN9ADVtfNZ+zjTC/M86GdqYKCxrLa6/aHrC9Gocw/7ovwOY+lIUrtF67crn99uS/cafZm5T8z3oV93+4oE367/JrfgsultJ9+P9/ZF73ZlZ2cog4FEXsyM5Ys4l6GsunRhWf+p/5NYUZIbD2R4OJBhfyJUGepeyEvNN019sGSzNWa6ze/kWabg3D61IXuRMkXrz1A+0Yb6xGZelmTrE7O3su725SeSof8mNJIuKoGpa/e+bYkojZ1+dEv0aA4nPDz036J8ajGjrJHQjQeZU1NApuFr6HcROZgSTNPvxuGv86aR6J9Ikn1xQ1+vrWPZcR/AHpvgSFSczrF1NJ4CS+frl++L7O6KN4Pm1z3xKis/sZ2Ci3TkSaynY2BkHDdlaKr/t94L0upBYGTmlrnpTVF88v7UjZZmX/L0Yf6Hil3JxPj490WSf6NpTlN8/RfJ6P2V3v8kZuon3H9Fwn08bgYl7f63679JFM33l8E+p6/ceiR92XWnnw/6a3K05UxDhu8hI19jmJ2H/67ctL2v/PpM/d9iEdR6pFOhKBV5/voo1KsvndV//eZPk6fvxtM1gaD7wENvnNFpkcj8/eghkvQQcx2SyUMnPJwdtZ+yBlL0LWrc8WP9GwlSin0O1GQbLEXJmRNO4xu4iab5mPhN/56JV1BAxyNo78YOCa3hpnVs2DqKriWFBDqp/tDI3bv5u/6ceUb7rG9g40PI/gJTfMIzE1P+iUX/S72/zP0vvf8G/Ix9qJnuf1+wJiIw3X9tSFr12Tj7Ai8wt+VDd+3FFyZ/bdMYHxsDpYAo+S+oOe+viHAnCWOaKAXXpDIKq1VsLBiql5eXtH73MH6jw5RR0UViLwDijFbcN9mebIc2RgR+fxi9qcL2xQxfp6ZZvPZlNPKIemf63cQj1b+HZvvKEaXgInyQn+mhYrBPotNmmTrR6KHf39uQ3XEMYmxKhZwyQrGs37d5ZziQQeAFwRc1W/sy+W7qOFa/Z+s/Ef/ch93UbsWp+2P6oRo2y9R/vKutuMQ91Fxb0u5/u/ZNKHPbF7D5t+MNPh/JG+MNN68b+ZpsK/S7Zf+3byNFHBNEKfo8zjbiK/r8HY+UpkUp7a039e0y5e3Jq9PwAJue1hsTCg+vQ28DMUpu+j0tqKn+ZbEvdjRnvinT394N5U32uaIUfmhY3eCh6YWbk1Gc+//hlw7zDWMQJWdeJRTTuPoTFtpHb8Lm8hkevmaH7K8wxWe8/THBP2N50wuCuf8VEqU89//U9LUNTKs+mzhS8tZRYkXpoze86eGIEdEpchs7M1+Tsf9a1Z8kPlai5A7NY9eejM9Qf7SVcaQ1I1GKvunHbQMevaIlLIAnITDtojL9Hq3XLEpxC/RT76OJ26zND4XiopRiX8zivtUN7rsXt+kl9u04tcsmbgWP3VQTU7/PyF0bCEwt25afuGPYqWR112e4yHJzRbp/af3PtE5m7n/li1KWkb4dS6s+m1uUzPe3nZU5rirl/op5FsV9/mApNtGZoyx+ZX/+li9K/lxqYKE2dk0ocfotuxPp0xWm6cKMoiSW9rkB78ZMMU6V9998A28ThUTJaF/MGkxkZJLe6YpuWTU99Iz1h26mhDUXqy3rpgd4lpvP9lqL/pPqn7l8+vSJuf+5niT234CfsQ+10XRR4v1vJ4pGmnntM07fiff9VY5PHMI251xT8tcMTf13PGI2fKozuk4i3ylZjoDSyhuD5F1gej4nVRNZU8o9feeZ4e088VszTa8514Wu8acuAuYGfp/e2TG9c8z0u4mlefE73T6//rAdgeF/aArmQPrORrq43Xex3/3Y3NQG+4LtO1y3e3IYaN/ER3zh8+c4gjvFzIW9K1I/M5iy37ATzZ+qnWycSSkftM9y1GLrkv11KfEJLMT7HxQb/YvcP9M70KbuL0P/S++/Mba7BYLTW2n3v03/tSMZf38Z7Ht9MhUVv6bkzJ/a3d/pVuYXJav7K0WU0ne+meNXdOdc0eevzzUgSq/Z9QiugkBBAnl2XRVsMlB8HqOk8qynJgi0nYB6ZfmM/tu7P+Psu7ZHulb+maeiqjLXak2iqsapFwIQMBIIfKfESMlIiwtKJMCBrCXCpCoItIYAI6XWhBJHIAABCDSfAKLU/BjiAQQgAIHWEECUWhNKHIEABCDQfAKsKTU/hngAAQhAoDUEGCm1JpQ4AgEIQKD5BNIPZBUS/NmHmO9f7FkVuTLhbLgiVVIWAhCoDQH10vklLd+anBJO5tm8samHKDX9Oxyz/YhS3h5KOQg0gYBaPveiVt9+TObZwtFClAojtE2dUEZD1AEBCNSSgFo++4JWg59bidL4bLgcmVl9703nK5l+N1EMlw9OP/pnb8Vnbo0/ETd66Gdy+9Oi5L/R22W2LNp+KGVHyMhg+9PnX+WYnk3NHJxWvw3/aOKA4NlqYR+nbU+v3z9XLC3zr4OteOZRUw/ldwhAII2AWj57WqvBL0rIPGvOjGmamjH9bgqlU/79T7rin2cae+p0YubWmNw9mfK9BEVpdOKw7IxTnY8feImZa4u279FJZhg92ifz0fQWmU2DpyyH64+KdNwZeFZ9IC3zaWJ8zQeClpN51NRL+R0CEDCI0vNaDX5ZPPOsRWbW9KP1/ROOkzPLZg5lSFSyPpSyTsf51/dlb2M35gj8rJlDs7ZvECVjZlAz3dSj6I31m/mni2rAPmNCudG1meJvjo+ZEFdAAAJFCajls2FRyp26wpgZM/DQTMlMGJqiyZq5MM6GcR0WD8XggzVnAjvftUk6hVGIbPgUat8gSrYP8sQeFcMveK2xfgv+tmtKxrZyiJJNfIrebZSHAASMBNT5M6f0M5u/il9TmipeRmbWSZWmk6JNv0/7FrP+k+lN2X1PH2dGvS0fyodyW/zcNkaSgbLdT96PJvqzyuFTpP08opQlnblh5JaS+E36StYfNkGU5ph51NzBuAICC0GgPFEyZj6N8jRlJjT9Hq5xWpSmk23ZPRTdzJtbIgfSlaPbXdl0cn9Z/Qk/tKNTlZYim7v9wOggNvOtKTOo2cn06VdT/Rn4x9ofsK/ASGm85hXJ/GsZH9vMn2acXAEBCMQQKG/6zq18evdVOPOlKTOh6XdTBMO7s45lZ2cog42j0WYDy4diTFp3U7ujMcp4lOWPrnx/EjOjOgUjU5TRh7td+5OrEjPfWmQGNrUV2eUXsr+czKO5Mos+toivMfNqev/1uvgDGR4OZJUPy01dhd8hkIuAWj53WqtvO7vvyKfkEcwypZWLuaHQvNuvwifqhAAEIGBHIDBSQpRcSdrXstsNb+W2Q1nOVfNuvxwvqAUCEIBAPgLq/Jm/189s/vfCj5TGU0ZZd/zl4x4pNe/2S3KDaiAAAQgUIqDOLX1VP3v/1wsvSoUoUhgCEIAABEohgCiVgpFKIAABCECgDALq3NIp/ex95zsl1pTKAEodEIAABCCQn4A6f+a0fmaT3Xf5EVISAhCAAATKIqDOLT2vn73vnH3HSKksqNQDAQhAAAL5CCBK+bhRCgIQgAAEKiCgzi6d0l9iTakCtFQJAQhAAAJZCSBKWYlxPQQgAAEIVEZAnXnxq/q59/hOqTLCVAwBCEAAAtYEECVrVFwIAQhAAAJVE0CUqiZM/RCAAAQgYE1ALb3wFf3l7/yGLeHWyLgQAhCAAASqIoAoVUWWeiEAAQhAIDMBRCkzMgpAAAIQgEBVBBClqshSLwQgAAEIZCbw/w7VeWnb8jJgAAAAAElFTkSuQmCC"/></div><p></p>'

];

//0为未完成,1为按时完成,2为迟交
const states = [
    0, 1, 2
];

const answers = [
    '<p>这里是参考答案！</p>'
];

const scores = [
    '55', '60', '65', '70', '75', '80', '85', '90', '95',
];

const usernames = [
    '刘一', '陈二', '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十',
];

let hwList = [];
for (let i = 0; i < 158; ++i) {
    hwList.push(
        {
            id: `${i}`,
            title: `作业${i}`,//作业标题
            username: usernames[i % usernames.length],//提交学生
            deadline: deadlines[i % deadlines.length],//截止时间
            requirement: requirements[i % requirements.length],//作业要求(html代码)
            content: contents[i % contents.length],//作业内容(html代码)
            answer: answers[i % answers.length],//参考答案(html代码)
            state: states[i % states.length],//完成情况
            hasCorrected: i % 7 == 0 ? true : false,//是否被批改
            submitTime: submitTimes[i % submitTimes.length],//提交时间
            score: scores[i % scores.length],//评分
            comment: `批注${i}`,//批注
            msg: `留言${i}`,//留言
        }
    )
}

let notSubmitUserList = [];
for (let i = 0; i < 40; ++i) {
    notSubmitUserList.push({
        username: usernames[i % usernames.length],
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: `5180219100${i}`,
        email: 'livingsu@sjtu.edu.cn',
        profile: '你好，云作业平台！',
        identity: '学生',
        address: '上海市闵行区上海交通大学',
        phone: '12345678',
    })
}


export default {
    'POST  /hw/list': (req, res) => {
        const { sid } = req.query;
        // console.log("hwlist")
        // console.log(sid);
        return res.json(hwList);
    },

    'POST /hw/info': (req, res) => {
        const { hwid } = req.query;
        res.send(hwList.find(item => { return item.id == hwid }));
    },

    'POST /hw/submission': (req, res) => {
        const { hwid } = req.query;
        console.log("submission:"+hwid);

        let hwDetialList=hwList.filter((item)=>{return item.state!=0});
        res.send({
            percentCorrection: 46,//批改百分比
            percentSubmission: 77,//提交百分比
            hwDetialList: hwDetialList,//提交的作业列表
            notSubmitUserList: notSubmitUserList,//未提交的用户列表
        })
    },
};