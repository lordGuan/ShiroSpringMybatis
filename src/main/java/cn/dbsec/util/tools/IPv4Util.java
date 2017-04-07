package cn.dbsec.util.tools;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

/**
 * IP地址转换
 * 
 * @author LCL
 * 
 */
public class IPv4Util {
	/**
	 * 
	 * <b>IP转换long</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017-2-9
	 * 
	 * @param ip
	 * @return
	 */
	public static Long ipToNumber(String ipAddress) {
		long result = 0;
		String[] ipAddressInArray = ipAddress.split("\\.");
		for (int i = 3; i >= 0; i--) {
			long ip = Long.parseLong(ipAddressInArray[3 - i]);
			result |= ip << (i * 8);
		}
		return result;
	}

	/**
	 * 
	 * <b>数字转换IP</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017-2-9
	 * 
	 * @param number
	 * @return
	 */
	public static String numberToIp(Long ip) {
		return ((ip >> 24) & 0xFF) + "." + ((ip >> 16) & 0xFF) + "." + ((ip >> 8) & 0xFF) + "." + (ip & 0xFF);
	}

	/**
	 * 根据掩码位获取掩码
	 * 
	 * @param maskBit
	 *            掩码位数，如"28"、"30"
	 * @return
	 */
	public static String getMaskByMaskBit(String maskBit) {
		return StringUtils.isEmpty(maskBit) ? "error, maskBit is null !" : maskBitMap().get(maskBit);
	}

	/**
	 * 根据 ip/掩码位 计算IP段的起始IP 如 IP串 218.240.38.69/30
	 * 
	 * @param ip
	 *            给定的IP，如218.240.38.69
	 * @param maskBit
	 *            给定的掩码位，如30
	 * @return 起始IP的字符串表示
	 */
	public static String getBeginIpStr(String ip, String maskBit) {
		return numberToIp(getBeginIpLong(ip, maskBit));
	}

	/**
	 * 根据 ip/掩码位 计算IP段的起始IP 如 IP串 218.240.38.69/30
	 * 
	 * @param ip
	 *            给定的IP，如218.240.38.69
	 * @param maskBit
	 *            给定的掩码位，如30
	 * @return 起始IP的长整型表示
	 */
	public static Long getBeginIpLong(String ip, String maskBit) {
		return ipToNumber(ip) & ipToNumber(getMaskByMaskBit(maskBit));
	}

	/**
	 * 根据 ip/掩码位 计算IP段的终止IP 如 IP串 218.240.38.69/30
	 * 
	 * @param ip
	 *            给定的IP，如218.240.38.69
	 * @param maskBit
	 *            给定的掩码位，如30
	 * @return 终止IP的字符串表示
	 */
	public static String getEndIpStr(String ip, String maskBit) {
		return numberToIp(getEndIpLong(ip, maskBit));
	}

	/**
	 * 根据 ip/掩码位 计算IP段的终止IP 如 IP串 218.240.38.69/30
	 * 
	 * @param ip
	 *            给定的IP，如218.240.38.69
	 * @param maskBit
	 *            给定的掩码位，如30
	 * @return 终止IP的长整型表示
	 */
	public static Long getEndIpLong(String ip, String maskBit) {
		return getBeginIpLong(ip, maskBit) + ~ipToNumber(getMaskByMaskBit(maskBit));
	}

	/**
	 * 根据子网掩码转换为掩码位 如 255.255.255.252转换为掩码位 为 30
	 * 
	 * @param netmarks
	 * @return
	 */
	public static int getNetMask(String netmarks) {
		StringBuffer sbf;
		String str;
		int inetmask = 0, count = 0;
		String[] ipList = netmarks.split("\\.");
		for (int n = 0; n < ipList.length; n++) {
			sbf = toBin(Integer.parseInt(ipList[n]));
			str = sbf.reverse().toString();
			count = 0;
			for (int i = 0; i < str.length(); i++) {
				i = str.indexOf('1', i);
				if (i == -1) {
					break;
				}
				count++;
			}
			inetmask += count;
		}
		return inetmask;
	}

	/**
	 * 计算子网大小
	 * 
	 * @param netmask
	 *            掩码位
	 * @return
	 */
	public static int getPoolMax(int maskBit) {
		if (maskBit <= 0 || maskBit >= 32) {
			return 0;
		}
		return (int) Math.pow(2, 32 - maskBit) - 2;
	}

	private static StringBuffer toBin(int x) {
		StringBuffer result = new StringBuffer();
		result.append(x % 2);
		x /= 2;
		while (x > 0) {
			result.append(x % 2);
			x /= 2;
		}
		return result;
	}

	/**
	 * 
	 * <b>存储着所有的掩码位及对应的掩码 key:掩码位 value:掩码（x.x.x.x）</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017-2-9
	 * 
	 * @return
	 */
	private static Map<String, String> maskBitMap() {
		Map<String, String> maskBit = new HashMap<String, String>();
		maskBit.put("1", "128.0.0.0");
		maskBit.put("2", "192.0.0.0");
		maskBit.put("3", "224.0.0.0");
		maskBit.put("4", "240.0.0.0");
		maskBit.put("5", "248.0.0.0");
		maskBit.put("6", "252.0.0.0");
		maskBit.put("7", "254.0.0.0");
		maskBit.put("8", "255.0.0.0");
		maskBit.put("9", "255.128.0.0");
		maskBit.put("10", "255.192.0.0");
		maskBit.put("11", "255.224.0.0");
		maskBit.put("12", "255.240.0.0");
		maskBit.put("13", "255.248.0.0");
		maskBit.put("14", "255.252.0.0");
		maskBit.put("15", "255.254.0.0");
		maskBit.put("16", "255.255.0.0");
		maskBit.put("17", "255.255.128.0");
		maskBit.put("18", "255.255.192.0");
		maskBit.put("19", "255.255.224.0");
		maskBit.put("20", "255.255.240.0");
		maskBit.put("21", "255.255.248.0");
		maskBit.put("22", "255.255.252.0");
		maskBit.put("23", "255.255.254.0");
		maskBit.put("24", "255.255.255.0");
		maskBit.put("25", "255.255.255.128");
		maskBit.put("26", "255.255.255.192");
		maskBit.put("27", "255.255.255.224");
		maskBit.put("28", "255.255.255.240");
		maskBit.put("29", "255.255.255.248");
		maskBit.put("30", "255.255.255.252");
		maskBit.put("31", "255.255.255.254");
		maskBit.put("32", "255.255.255.255");
		return maskBit;
	}

	/**
	 * 
	 * <b>判断IP格式和范围</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017-2-27
	 * 
	 * @param addr
	 * @return
	 */
	public static boolean isIPv4(String addr) {
		if (addr.length() < 7 || addr.length() > 15 || StringUtils.isEmpty(addr)) {
			return false;
		}
		String rexp = "^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$";
		Pattern pat = Pattern.compile(rexp);
		Matcher mat = pat.matcher(addr);
		boolean ipAddress = mat.find();
		return ipAddress;
	}

	/**
	 * 
	 * <b>本地IP转换</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017年3月23日下午4:27:22
	 *
	 * @param ip
	 * @return
	 */
	public static String getRealIp(String ip) {
		if (StringUtils.equals(ip, "127.0.0.1") || StringUtils.equals(ip, "0:0:0:0:0:0:0:1")) {
			// 根据网卡取本机配置的IP
			InetAddress inet = null;
			try {
				inet = InetAddress.getLocalHost();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
			return inet.getHostAddress();
		}
		return ip;
	}

	public static void main(String[] args) {
		System.out.println(ipToNumber("192.161.1.103"));
		System.out.println(isIPv4("192.161.1.103"));
		System.out.println(numberToIp(3231777127L));
	}

}
