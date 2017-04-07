package cn.dbsec.util.tools;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.HashMap;
import java.util.Map.Entry;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteWatchdog;
import org.apache.commons.exec.PumpStreamHandler;
import org.apache.commons.lang.SystemUtils;
import org.apache.commons.lang.math.NumberUtils;

public class CommonExec {
	private static CommonExec commonExec = null;

	public static CommonExec getExec() {
		if (commonExec == null) {
			commonExec = new CommonExec();
		}
		return commonExec;
	}

	public static String INFO = "INFO";// 成功返回信息
	public static String ERROR = "ERROR";// 失败信息
	public static String RETURN = "RETURN";// 返回值0-成功 1-失败或终止

	/**
	 * 
	 * <b>执行命令</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017年2月6日下午6:30:28
	 *
	 * @param cmdStr
	 *            命令
	 * @param overTime
	 *            超时时间
	 * @param retVal
	 *            是否需要返回值
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, String> exec(String cmdStr, int overTime, boolean retVal) throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		ByteArrayOutputStream outputStream = null;
		ByteArrayOutputStream errorStream = null;
		CommandLine cmdLine = CommandLine.parse(cmdStr);
		DefaultExecutor executor = new DefaultExecutor();
		String charset = "";
		if (SystemUtils.IS_OS_LINUX) {
			executor.setWorkingDirectory(new File("/tmp/"));
			charset = "UTF-8";
		}
		if (SystemUtils.IS_OS_WINDOWS) {
			executor.setWorkingDirectory(new File("C://"));
			charset = "GBK";
		}
		// 如果需要返回值再初始化
		if (retVal) {
			outputStream = new ByteArrayOutputStream();
			errorStream = new ByteArrayOutputStream();
			PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream, errorStream);
			executor.setStreamHandler(streamHandler);
		}
		// 设置超时时间
		if (overTime > 0) {
			ExecuteWatchdog watchdog = new ExecuteWatchdog(overTime * 1000);
			executor.setWatchdog(watchdog);
			executor.setExitValue(1);// 由于ping被到时间终止，所以其默认退出值已经不是0，而是1，所以要设置它
		}
		int exitValue = executor.execute(cmdLine);
		map.put(RETURN, exitValue + "");
		if (outputStream != null && errorStream != null) {
			map.put(INFO, outputStream.toString(charset));
			map.put(ERROR, errorStream.toString(charset));
		}
		return map;
	}

	/**
	 * 
	 * <b>仅返回成功失败</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017年2月6日下午6:33:16
	 *
	 * @param cmdStr
	 * @return 0-成功 1-失败
	 * @throws Exception
	 */
	public int exec(String cmdStr) throws Exception {
		HashMap<String, String> map = exec(cmdStr, 0, false);
		return NumberUtils.toInt(map.get(RETURN));
	}

	/**
	 * 
	 * <b>仅返回成功失败</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017年2月6日下午6:34:35
	 *
	 * @param cmdStr
	 * @param overTime
	 * @return
	 * @throws Exception
	 */
	public int exec(String cmdStr, int overTime) throws Exception {
		HashMap<String, String> map = exec(cmdStr, 0, false);
		return NumberUtils.toInt(map.get(RETURN));
	}

	/**
	 * 
	 * <b>返回结果和错误信息</b><br/>
	 * 
	 * @author <b>LCL</b><br/>
	 * @date 2017年2月6日下午6:55:51
	 *
	 * @param cmdStr
	 * @param overTime
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, String> execRet(String cmdStr, int overTime) throws Exception {
		return exec(cmdStr, overTime, true);
	}

	public static void main(String[] args) {

		try {
			HashMap<String, String> map = CommonExec.getExec().exec("cmd.exe /C 'dir'", 0, true);
			for (Entry<String, String> entry : map.entrySet()) {
				System.out.println(map.get(entry.getKey()));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
